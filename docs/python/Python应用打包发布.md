# Python应用打包发布

1. 注册Pypi账号
2. 安装build（建议在虚拟环境中安装）
    ```shell
    .venv\Script\activate
    pip install build
    ```

3. 安装twine（建议在虚拟环境中安装）
    ```shell
    pip install twine
    ```

4. 确定项目结构
    ```
    packaging_tutorial/
    ├── LICENSE
    ├── pyproject.toml
    ├── README.md
    ├── src/
    │   └── example/
    │       ├── __init__.py
    │       └── example.py
    └── tests/
    ```

5. 选中开源协议，将协议内容填到LICENSE文件中[choosealicense]([https://choosealicense.com/](https://choosealicense.com/))
6. 编写`pyproject.toml`项目配置文件

    ```toml
    [project]
    name = "XXX"
    version = "XXX"
    authors = [
        {name="XXX", email="XXX"}
    ]
    description = "XXX"
    readme = "README.md"
    license = { text = "XXX" }
    requires-python = ">=3.10, <4.0"
    dependencies = [
        # 填写项目依赖信息
    ]
    classifiers = [
        # 标签信息，可以在https://pypi.org/classifiers/拷贝响应信息
    ]
    
    [tool.setuptools]
    include-package-data = true
    
    [tool.setuptools.packages.find]
    where = ["src"]  # 打包src目录下
    include = ["example"]  # 将被打包进去的项目文件夹名称ABC
    
    
    [tool.setuptools.package-data]
    example = ["res"]  # 打包example项目下的res资源文件
    
    [build-system]
    requires = ["setuptools >= 65.6.3"]
    build-backend = "setuptools.build_meta"
    
    [project.urls]
    "Homepage" = "XXX"
    "Bug Tracker" = "XXX"
    ```

7. 编译
    ```shell
    python -m build
    ```

8. 发布
    ```shell
    python -m twine upload --repository pypi dist/*
    ```
