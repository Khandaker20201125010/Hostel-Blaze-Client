const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="md:w-3/12 text-center m-auto">
            <h3 className="text-gradient text-4xl font-bold border-y-2 border-cyan-600">{heading}</h3>
            <p className="mt-5 font-bold mb-5">{subHeading}</p>
            
        </div>
    );
};

export default SectionTitle;