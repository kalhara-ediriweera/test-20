function SmartItem({crop_name, location, area}) {
    return (
        <>
            <div className="smart-item">
                <p className="smart-name">
                    {crop_name}
                </p>
                <p className="smart-area">
                    Area : {area} Hectares
                </p>
                <p className="smart-area">
                    Location : {location} 
                </p>
            </div>
        </>
    );
}

export default SmartItem;