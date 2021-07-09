class Vocabulary {
    word!: string;
    hide?: boolean = false;
}

class VocabularyType {
    translation!: string;
    category!: string;
    examples!: Example[];

    constructor(translation: string = '', category: string = 'n.', examples: Example[] = []) {
        this.translation = translation;
        this.category = category;
        this.examples = examples;
    }

    clone = () => {
        return new VocabularyType(
            this.translation,
            this.category,
            this.examples.map(item => item.clone())
        )
    }
}

class Example {
    src!: string;
    dst!: string;

    constructor(src: string = '', dst: string = '') {
        this.src = src;
        this.dst = dst;
    }

    clone = () => {
        return new Example(this.src, this.dst);
    }
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

export { Vocabulary, VocabularyType, Example, EditVocabularyType, EditExample, EditType }