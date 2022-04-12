showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular,
}

type TBook = {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
};

const getAllBooks = (): TBook[] => {
    const books: TBook[] = [
        {
            id: 1,
            title: 'Refactoring JavaScript',
            category: Category.JavaScript,
            author: 'Evan Burchard',
            available: true,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            category: Category.JavaScript,
            author: 'Liang Yuxian Eugene',
            available: false,
        },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            category: Category.JavaScript,
            author: 'Andrea Chiarelli',
            available: true,
        },
    ];

    return books;
};

const logFirstAvailable = (books: TBook[]): void => {
    const firstAvailableBookTitle = books.find(({ available }) => available)?.title || '-';

    console.log(`Total number of books: ${books.length}`);
    console.log(`First available book: ${firstAvailableBookTitle}`);
};

const getBookTitlesByCategory = (category: Category): Array<string> => {
    return getAllBooks()
        .filter(book => book.category === category)
        .map(book => book?.title);
};

const logBookTitles = (titles: string[]): void => {
    titles.forEach(title => console.log(title));
};

const getBookAuthorByIndex = (index: number): [title: string, author: string] => {
    const book = getAllBooks()[index];
    return [book?.title, book?.author];
};

const calcTotalPages = (): bigint => {
    const data = [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    const result = data.reduce((acc, curr) => {
        return acc + BigInt(curr.books) * BigInt(curr.avgPagesPerBook);
    }, 0n);

    return result;
};

// ========================================
// Task 02.01.
logFirstAvailable(getAllBooks());
logBookTitles(getBookTitlesByCategory(Category.JavaScript));
logBookTitles(getBookTitlesByCategory(Category.CSS));
logBookTitles(getBookTitlesByCategory(Category.Angular));
console.log(getBookAuthorByIndex(1));
console.log(calcTotalPages());
