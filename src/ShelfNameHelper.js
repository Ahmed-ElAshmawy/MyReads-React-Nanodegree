
export const mapShelfName = (name) => {
    switch (name) {
        case 'currentlyReading':
            return 'Currently Reading';
        case 'wantToRead':
            return 'Want To Read';
        case 'read':
            return 'Read';
        default:
            return 'None';
    }
}

export const reverseMapShelfName = (name) => {
    switch (name) {
        case 'Currently Reading':
            return 'currentlyReading';
        case 'Want To Read':
            return 'wantToRead';
        case 'Read':
            return 'read';
        default:
            return 'None';
    }
}