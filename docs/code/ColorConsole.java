public class ColorConsole{
    static String reset = "\033[0m";
    static String black = "\033[0;30m";
    static String red = "\033[0;31m";
    static String green = "\033[0;32m";
    static String yellow = "\033[0;33m";
    static String blue = "\033[0;34m";
    static String magenta = "\033[0;35m";
    static String cyan = "\033[0;36m";
    static String white = "\033[0;37m";

    private static void printNormalColorFont(String str){
        System.out.println(black + str + reset);
        System.out.println(red + str + reset);
        System.out.println(green + str + reset);
        System.out.println(yellow + str + reset);
        System.out.println(blue + str + reset);
        System.out.println(magenta + str + reset);
        System.out.println(cyan + str + reset);
        System.out.println(white + str + reset);
    }

    static String blackBold = "\033[1;30m";
    static String redBold = "\033[1;31m";
    static String greenBold = "\033[1;32m";
    static String yellowBold = "\033[1;33m";
    static String blueBold = "\033[1;34m";
    static String magentaBold = "\033[1;35m";
    static String cyanBold = "\033[1;36m";
    static String whiteBold = "\033[1;37m";

    private static void printBoldColorFont(String str){
        System.out.println(blackBold + str + reset);
        System.out.println(redBold + str + reset);
        System.out.println(greenBold + str + reset);
        System.out.println(yellowBold + str + reset);
        System.out.println(blueBold + str + reset);
        System.out.println(magentaBold + str + reset);
        System.out.println(cyanBold + str + reset);
        System.out.println(whiteBold + str + reset);
    }

    static String blackUnderline = "\033[4;30m";
    static String redUnderline = "\033[4;31m";
    static String greenUnderline = "\033[4;32m";
    static String yellowUnderline = "\033[4;33m";
    static String blueUnderline = "\033[4;34m";
    static String magentaUnderline = "\033[4;35m";
    static String cyanUnderline = "\033[4;36m";
    static String whiteUnderline = "\033[4;37m";

    private static void printUnderlineColorFont(String str){
        System.out.println(blackUnderline + str + reset);
        System.out.println(redUnderline + str + reset);
        System.out.println(greenUnderline + str + reset);
        System.out.println(yellowUnderline + str + reset);
        System.out.println(blueUnderline + str + reset);
        System.out.println(magentaUnderline + str + reset);
        System.out.println(cyanUnderline + str + reset);
        System.out.println(whiteUnderline + str + reset);
    }

    static String blackBackground = "\033[40m";
    static String redBackground = "\033[41m";
    static String greenBackground = "\033[42m";
    static String yellowBackground = "\033[43m";
    static String blueBackground = "\033[44m";
    static String magentaBackground = "\033[45m";
    static String cyanBackground = "\033[46m";
    static String whiteBackground = "\033[47m";

    private static void printBackgroundColorFont(String str){
        System.out.println(blackBackground + str + reset);
        System.out.println(redBackground + str + reset);
        System.out.println(greenBackground + str + reset);
        System.out.println(yellowBackground + str + reset);
        System.out.println(blueBackground + str + reset);
        System.out.println(magentaBackground + str + reset);
        System.out.println(cyanBackground + str + reset);
        System.out.println(whiteBackground + str + reset);
    }

    static String blackHighlight = "\033[0;90m";
    static String redHighlight = "\033[0;91m";
    static String greenHighlight = "\033[0;92m";
    static String yellowHighlight = "\033[0;93m";
    static String blueHighlight = "\033[0;94m";
    static String magentaHighlight = "\033[0;95m";
    static String cyanHighlight = "\033[0;96m";
    static String whiteHighlight = "\033[0;97m";

    private static void printHighlightColorFont(String str){
        System.out.println(blackHighlight + str + reset);
        System.out.println(redHighlight + str + reset);
        System.out.println(greenHighlight + str + reset);
        System.out.println(yellowHighlight + str + reset);
        System.out.println(blueHighlight + str + reset);
        System.out.println(magentaHighlight + str + reset);
        System.out.println(cyanHighlight + str + reset);
        System.out.println(whiteHighlight + str + reset);
    }

    static String blackHighlightBold = "\033[1;90m";
    static String redHighlightBold = "\033[1;91m";
    static String greenHighlightBold = "\033[1;92m";
    static String yellowHighlightBold = "\033[1;93m";
    static String blueHighlightBold = "\033[1;94m";
    static String magentaHighlightBold = "\033[1;95m";
    static String cyanHighlightBold = "\033[1;96m";
    static String whiteHighlightBold = "\033[1;97m";

    private static void printHighlightBoldColorFont(String str){
        System.out.println(blackHighlightBold + str + reset);
        System.out.println(redHighlightBold + str + reset);
        System.out.println(greenHighlightBold + str + reset);
        System.out.println(yellowHighlightBold + str + reset);
        System.out.println(blueHighlightBold + str + reset);
        System.out.println(magentaHighlightBold + str + reset);
        System.out.println(cyanHighlightBold + str + reset);
        System.out.println(whiteHighlightBold + str + reset);
    }

    static String blackHighlightBackground = "\033[0;100m";
    static String redHighlightBackground = "\033[0;101m";
    static String greenHighlightBackground = "\033[0;102m";
    static String yellowHighlightBackground = "\033[0;103m";
    static String blueHighlightBackground = "\033[0;104m";
    static String magentaHighlightBackground = "\033[0;105m";
    static String cyanHighlightBackground = "\033[0;106m";
    static String whiteHighlightBackground = "\033[0;107m";

    private static void printHighlightBackgroundColorFont(String str){
        System.out.println(blackHighlightBackground + str + reset);
        System.out.println(redHighlightBackground + str + reset);
        System.out.println(greenHighlightBackground + str + reset);
        System.out.println(yellowHighlightBackground + str + reset);
        System.out.println(blueHighlightBackground + str + reset);
        System.out.println(magentaHighlightBackground + str + reset);
        System.out.println(cyanHighlightBackground + str + reset);
        System.out.println(whiteHighlightBackground + str + reset);
    }
    
    public static void main(String[] args){
        printHighlightBackgroundColorFont("helloworld");
    }

}