class VocabularyType {
    translation!: string;
    category!: string;
    examples!: Example[];
}

class Example {
    src!: string;
    dst!: string;
}

class EditVocabularyType {
    editTranslation!: boolean;
    editCategory!: boolean;
    editExamples!: EditExample[];
    foldExample!: boolean;
}

class EditExample {
    editSrc!: boolean;
    editDst!: boolean;
}

enum EditType {
    Translation,
    Category,
    ExampleSrc,
    ExampleDst
}

export { VocabularyType, Example, EditVocabularyType, EditExample, EditType }