import { FaSpinner } from "react-icons/fa";
import './SpinnerIcon.css'
const SpinnerIcono = ({color, size}) => {

    return (
        <>
        <section className="section_i">
            <FaSpinner className="rotateIn" style={{color: color, textAlign:'center', fontSize:size }}/>

        </section>
        </>
    );
};

export default SpinnerIcono;