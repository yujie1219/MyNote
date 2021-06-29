class VocabularyType {
    category!: string;
    transAndExamples!: TransAndExample[];

    VocabularyType(category: string, transAndExamples: TransAndExample[]) {
        this.category = category;
        this.transAndExamples = transAndExamples;
    }
}

class TransAndExample {
    translation!: string;
    examples!: Example[];

    TransAndExample(translation: string, examples: Example[]) {
        this.translation = translation;
        this.examples = examples;
    }
}

class Example {
    src!: string;
    dst!: string;

    Example(src: string, dst: string) {
        this.src = src;
        this.dst = dst;
    }
}

export { VocabularyType, TransAndExample, Example }