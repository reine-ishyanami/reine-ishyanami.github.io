---
title: Annotation Processor Tool
date: 2024/7/3
tags:
 - Java
categories:
 - dev
---

# Annotation Processor Tool使用

## 介绍

Annotation Processor Tool（APT）是Java 5引入的，用于在编译时处理注解的工具。它允许在编译时生成额外的代码或进行其他处理。

## 用法

使用APT，需要编写一个注解处理器（Annotation Processor）和一个或多个注解。然后，在编译时，使用APT工具来处理这些注解，生成额外的代码或进行其他处理。

## 示例

> 本示例使用Gradle构建工具构建项目，本工程目标是通过APT创建工厂类实现工厂模式

### APT子工程

1. 引入依赖

    ```groovy
    dependencies {
        implementation("com.squareup:javapoet:1.13.0")
        implementation("com.google.auto.service:auto-service:1.1.1")
        annotationProcessor("com.google.auto.service:auto-service:1.1.1")
    }    
    ```

2. 创建注解

    ```java
    package com.reine.apt.annotation;

    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;

    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.SOURCE)
    public @interface Factory {

        /**
         * The name of the factory
         */
        Class<?> type();

        /**
         * The identifier for determining which item should be instantiated
         */
        String id();
    }
    ```

3. 处理过程中用于封装数据的实体类

    ```java
    package com.reine.apt.model;

    import com.reine.apt.annotation.Factory;

    import javax.lang.model.element.TypeElement;
    import javax.lang.model.type.DeclaredType;
    import javax.lang.model.type.MirroredTypeException;

    public class FactoryAnnotatedClass {

        private final TypeElement typeElement;
        private final String id;
        private String qualifiedSuperClassName;
        private String simpleTypeName;

        public FactoryAnnotatedClass(TypeElement typeElement) throws IllegalArgumentException {
            this.typeElement = typeElement;
            Factory annotation = typeElement.getAnnotation(Factory.class);
            id = annotation.id();

            if ("".equals(id)) {
                throw new IllegalArgumentException(
                        "id() in @%s for class %s is null or empty! that's not allowed".formatted(
                                Factory.class.getSimpleName(),
                                typeElement.getQualifiedName().toString()));
            }

            // Get the full QualifiedTypeName
            try {
                Class<?> clazz = annotation.type();
                qualifiedSuperClassName = clazz.getCanonicalName();
                simpleTypeName = clazz.getSimpleName();
            } catch (MirroredTypeException mte) {
                DeclaredType classTypeMirror = (DeclaredType) mte.getTypeMirror();
                TypeElement classTypeElement = (TypeElement) classTypeMirror.asElement();
                qualifiedSuperClassName = classTypeElement.getQualifiedName().toString();
                simpleTypeName = classTypeElement.getSimpleName().toString();
            }
        }

        /**
        * Get the id as specified in {@link Factory#id()}. return the id
        */
        public String getId() {
            return id;
        }

        /**
        * Get the full qualified name of the type specified in
        * {@link Factory#type()}.
        *
        * @return qualified name
        */
        public String getQualifiedFactoryGroupName() {
            return qualifiedSuperClassName;
        }

        /**
        * Get the simple name of the type specified in {@link Factory#type()}.
        *
        * @return qualified name
        */
        public String getSimpleFactoryGroupName() {
            return simpleTypeName;
        }

        /**
        * The original element that was annotated with @Factory
        */
        public TypeElement getTypeElement() {
            return typeElement;
        }
    }
    ```

4. 自定义异常类

    ```java
    package com.reine.apt.exception;

    import com.reine.apt.model.FactoryAnnotatedClass;

    public class IdAlreadyUsedException extends RuntimeException{

        private FactoryAnnotatedClass clazz;

        public IdAlreadyUsedException(FactoryAnnotatedClass clazz) {
            this.clazz = clazz;
        }

        public FactoryAnnotatedClass getExisting() {
            return clazz;
        }
    }
    ```

5. 收集数据以及后续进行代码生成的操作类

    ```java
    package com.reine.apt.model;

    import com.reine.apt.exception.IdAlreadyUsedException;
    import com.squareup.javapoet.JavaFile;
    import com.squareup.javapoet.MethodSpec;
    import com.squareup.javapoet.TypeName;
    import com.squareup.javapoet.TypeSpec;

    import javax.annotation.processing.Filer;
    import javax.lang.model.element.Modifier;
    import javax.lang.model.element.PackageElement;
    import javax.lang.model.element.TypeElement;
    import javax.lang.model.util.Elements;
    import java.io.IOException;
    import java.util.LinkedHashMap;
    import java.util.Map;

    public record FactoryGroupedClasses(String qualifiedClassName) {

        private static final Map<String, FactoryAnnotatedClass> itemsMap = new LinkedHashMap<>();

        public void add(FactoryAnnotatedClass toInsert) throws IdAlreadyUsedException {
            FactoryAnnotatedClass existing = itemsMap.get(toInsert.getId());
            if (existing != null) {
                throw new IdAlreadyUsedException(existing);
            }
            itemsMap.put(toInsert.getId(), toInsert);
        }

        /**
         * Will be added to the name of the generated factory class
         */
        private static final String SUFFIX = "Factory";

        /**
         * This method will be invoked multiple times, but only need to generate one object, <br/>
         * so use this flag to determine whether it has been called once
         */
        private static Boolean created = Boolean.FALSE;

        public synchronized void generateCode(Elements elementUtils, Filer filer) throws IOException {
            if (!created) {
                TypeElement superClassName = elementUtils.getTypeElement(qualifiedClassName);
                String factoryClassName = superClassName.getSimpleName() + SUFFIX;
                PackageElement pkg = elementUtils.getPackageOf(superClassName);
                String packageName = pkg.isUnnamed() ? null : pkg.getQualifiedName().toString();

                MethodSpec.Builder method = MethodSpec.methodBuilder("create")
                        .addModifiers(Modifier.PUBLIC)
                        .addParameter(String.class, "id")
                        .returns(TypeName.get(superClassName.asType()));

                // check if id is null
                method.beginControlFlow("if (id == null)")
                        .addStatement("throw new IllegalArgumentException($S)", "id is null!")
                        .endControlFlow();

                // Generate items map

                for (FactoryAnnotatedClass item : itemsMap.values()) {
                    method.beginControlFlow("if ($S.equals(id))", item.getId())
                            .addStatement("return new $L()", item.getTypeElement().getQualifiedName().toString())
                            .endControlFlow();
                }

                method.addStatement("throw new IllegalArgumentException($S + id)", "Unknown id = ");

                TypeSpec typeSpec = TypeSpec.classBuilder(factoryClassName)
                        .addModifiers(Modifier.PUBLIC)
                        .addMethod(method.build()).build();

                // Write file
                JavaFile.builder(packageName, typeSpec).build().writeTo(filer);
                created = true;
            }
        }
    }
    ```

6. 注解处理器

    ```java
    package com.reine.apt.processor;

    import com.google.auto.service.AutoService;
    import com.reine.apt.annotation.Factory;
    import com.reine.apt.exception.IdAlreadyUsedException;
    import com.reine.apt.model.FactoryAnnotatedClass;
    import com.reine.apt.model.FactoryGroupedClasses;

    import javax.annotation.processing.*;
    import javax.lang.model.SourceVersion;
    import javax.lang.model.element.*;
    import javax.lang.model.type.TypeKind;
    import javax.lang.model.type.TypeMirror;
    import javax.lang.model.util.Elements;
    import javax.lang.model.util.Types;
    import javax.tools.Diagnostic;
    import java.io.IOException;
    import java.util.*;

    @SupportedAnnotationTypes("com.reine.apt.annotation.Factory")
    @SupportedSourceVersion(SourceVersion.RELEASE_8)
    @AutoService(Processor.class)
    public class FactoryProcessor extends AbstractProcessor {

        private Types typeUtils;
        private Elements elementUtils;
        private Filer filer;
        private Messager messager;

        private final Map<String, FactoryGroupedClasses> factoryClasses =
                new LinkedHashMap<>();

        @Override
        public synchronized void init(ProcessingEnvironment processingEnv) {
            super.init(processingEnv);
            typeUtils = processingEnv.getTypeUtils();
            elementUtils = processingEnv.getElementUtils();
            filer = processingEnv.getFiler();
            messager = processingEnv.getMessager();
        }

        @Override
        public boolean process(Set<? extends TypeElement> elements, RoundEnvironment roundEnv) {
            // 被@Factory注解的元素列表
            for (Element element : roundEnv.getElementsAnnotatedWith(Factory.class)) {
                if (element instanceof TypeElement typeElement) {
                    try {
                        FactoryAnnotatedClass annotatedClass = new FactoryAnnotatedClass(typeElement); // throws IllegalArgumentException
                        if (!isValidClass(annotatedClass)) {
                            return true; // 结束处理流程
                        }
                        // Everything is fine, so try to add
                        FactoryGroupedClasses factoryClass = factoryClasses.get(annotatedClass.getQualifiedFactoryGroupName());
                        if (factoryClass == null) {
                            String qualifiedGroupName = annotatedClass.getQualifiedFactoryGroupName();
                            factoryClass = new FactoryGroupedClasses(qualifiedGroupName);
                            factoryClasses.put(qualifiedGroupName, factoryClass);
                        }

                        // Throws IdAlreadyUsedException if id is conflicting with
                        // another @Factory annotated class with the same id
                        factoryClass.add(annotatedClass);
                    } catch (IllegalArgumentException e) {
                        // @Factory.id() is empty --> printing error message
                        error(typeElement, e.getMessage());
                        return true;
                    } catch (IdAlreadyUsedException e) {
                        FactoryAnnotatedClass existing = e.getExisting();
                        // Already existing
                        error(element,
                                "Conflict: The class %s is annotated with @%s with id ='%s' but %s already uses the same id",
                                typeElement.getQualifiedName().toString(),
                                Factory.class.getSimpleName(), existing
                                        .getTypeElement().getQualifiedName().toString());
                        return true;
                    }
                }
            }
            try {
                for (FactoryGroupedClasses factoryClass : factoryClasses.values()) {
                    factoryClass.generateCode(elementUtils, filer);
                }
            } catch (IOException e) {
                error(null, e.getMessage());
            }

            return true;

        }

        @Override
        public Set<String> getSupportedAnnotationTypes() {
            Set<String> annotations = new LinkedHashSet<>();
            annotations.add(Factory.class.getCanonicalName());
            return annotations;
        }

        @Override
        public SourceVersion getSupportedSourceVersion() {
            return SourceVersion.latestSupported();
        }

        private boolean isValidClass(FactoryAnnotatedClass item) {

            // Cast to TypeElement, has more type specific methods
            TypeElement classElement = item.getTypeElement();

            // 不是PUBLIC类
            if (!classElement.getModifiers().contains(Modifier.PUBLIC)) {
                error(classElement, "The class %s is not public.", classElement
                        .getQualifiedName().toString());
                return false;
            }

            // 是抽象类
            if (classElement.getModifiers().contains(Modifier.ABSTRACT)) {
                error(classElement,
                        "The class %s is abstract. You can't annotate abstract classes with @%",
                        classElement.getQualifiedName().toString(),
                        Factory.class.getSimpleName());
                return false;
            }

            // 必须声明为@Factory.type()的子类
            TypeElement superClassElement = elementUtils.getTypeElement(item
                    .getQualifiedFactoryGroupName());
            if (superClassElement.getKind() == ElementKind.INTERFACE) {
                // 当前类没有实现接口
                if (!classElement.getInterfaces().contains(superClassElement.asType())) {
                    error(classElement,
                            "The class %s annotated with @%s must implement the interface %s",
                            classElement.getQualifiedName().toString(),
                            Factory.class.getSimpleName(),
                            item.getQualifiedFactoryGroupName());
                    return false;
                }
            } else {
                // Check subclassing
                TypeElement currentClass = classElement;
                // 递归查找父类
                while (true) {
                    TypeMirror superClassType = currentClass.getSuperclass();

                    if (superClassType.getKind() == TypeKind.NONE) {
                        // 当前类为java.lang.Object
                        error(classElement,
                                "The class %s annotated with @%s must inherit from %s",
                                classElement.getQualifiedName().toString(),
                                Factory.class.getSimpleName(),
                                item.getQualifiedFactoryGroupName());
                        return false;
                    }

                    // 父类是Factory.type()指定的类型
                    if (superClassType.toString().equals(
                            item.getQualifiedFactoryGroupName())) {
                        // Required super class found
                        break;
                    }

                    // 将当前父类赋值于当前类，递归查找
                    currentClass = (TypeElement) typeUtils.asElement(superClassType);
                }
            }
            // 是否包含一个PUBLIC无参构造函数
            for (Element enclosed : classElement.getEnclosedElements()) {
                if (enclosed.getKind() == ElementKind.CONSTRUCTOR) {
                    ExecutableElement constructorElement = (ExecutableElement) enclosed;
                    if (constructorElement.getParameters().isEmpty()
                        && constructorElement.getModifiers().contains(
                            Modifier.PUBLIC)) {
                        // Found an empty constructor
                        return true;
                    }
                }
            }

            // No empty constructor found
            error(classElement,
                    "The class %s must provide an public empty default constructor",
                    classElement.getQualifiedName().toString());
            return false;
        }

        private void error(Element e, String msg, Object... args) {
            messager.printMessage(
                    Diagnostic.Kind.ERROR,
                    String.format(msg, args),
                    e);
        }
    }
    ```

### 测试工程

1. 引入依赖

    ```groovy
    dependencies {
        implementation(project(":apt"))
        annotationProcessor(project(":apt"))
    }
    ```

2. 实现类

    ```java
    package com.reine.test.entity;
    import com.reine.apt.annotation.Factory;

    public interface Meal {
        float getPrice();
    }


    @Factory(type= Meal.class, id="Calzone")
    class CalzonePizza implements Meal{

        @Override
        public float getPrice() {
            return 8.5f;
        }
    }

    @Factory(type=Meal.class, id="Margherita")
    class MargheritaPizza implements Meal{

        @Override
        public float getPrice() {
            return 6.0f;
        }
    }

    @Factory(type=Meal.class, id="Tiramisu")
    class Tiramisu implements Meal{

        @Override
        public float getPrice() {
            return 4.5f;
        }
    }
    ```

3. 测试主类

    > 这个类在集成开发环境中会有提示找不到类的错误提示，但实际可以运行，原因是MealFactory这个类是编译期生成的，在源代码中并不存在

    ```java
    import com.reine.test.entity.Meal;
    import com.reine.test.entity.MealFactory;

    public class PizzaStore {

        private final MealFactory factory = new MealFactory();
        
        public Meal order(String mealName) {
            return factory.create(mealName);
        }

        public static void main(String[] args) {
            System.out.println("welcome to pizza store");
            PizzaStore pizzaStore = new PizzaStore();
            Meal meal = pizzaStore.order(args[0]);
            System.out.println("Bill:$" + meal.getPrice());
        }
    }
    ```

4. 运行测试

    ```shell
    ./gradlew build
    java -cp build/classes/java/main com.reine.test.PizzaStore Calzone
    welcome to pizza store
    Bill:$8.5
    ```
