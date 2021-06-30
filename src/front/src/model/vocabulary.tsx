class VocabularyType {
    category!: string;
    transAndExamples!: TransAndExample[];
}

class TransAndExample {
    translation!: string;
    examples!: Example[];
}

class Example {
    src!: string;
    dst!: string;
}

export { VocabularyType, TransAndExample, Example }