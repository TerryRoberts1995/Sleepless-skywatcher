// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

const Icons = () => {
    return library.add(
        faPlusSquare,
        faMinusSquare,
        fab

    );
}

export default Icons;