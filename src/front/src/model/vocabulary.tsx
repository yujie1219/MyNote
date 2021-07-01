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
    foldExample!: boolean;
}

export { VocabularyType, Example, EditVocabularyType }