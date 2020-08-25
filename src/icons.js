// import the library
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusSquare, faMinusSquare, faBars } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

const Icons = () => {
    return library.add(
        faPlusSquare,
        faMinusSquare,
        faBars,
        fab

    );
}

export default Icons;