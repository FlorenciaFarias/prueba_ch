import PropTypes from 'prop-types';

const NavbarTitulo = ({titulo}) => {
    NavbarTitulo.propTypes = {
        titulo: PropTypes.string.isRequired
    };

    return (
        <>
            <nav className="navTitulo">
                <h6>{ titulo }</h6>
            </nav>
        </>
    )
}

export default NavbarTitulo;