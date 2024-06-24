import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="ex">
            <h1 className="flex justify-center items-center p-80">
                <Link to='/'> <button className="text-center btn bg-sky-200 text-orange-400 ">Go Back Home</button></Link>
            </h1>
        </div>
    );
};

export default Error;
