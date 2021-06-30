class VocabularyType {
    translation!: string;
    category!: string;
    examples!: Example[];
}

class Example {
    src!: string;
    dst!: string;
}

export { VocabularyType, Example }