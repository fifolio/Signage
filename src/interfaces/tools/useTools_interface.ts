interface useTools_interface {
    textOptions: {
        color: string,
        fontSize: number,
        text: string,
    },
    setTextOptions: (state: { color: string; fontSize: number; text: string; }) => void,
    handleAddText: boolean,
    setHandleAddText: (state: boolean) => void,

    // Add Square
    squareOptions: {
        fill: string,
        stroke: string,
        strokeWidth: number,
        width: number,
        height: number,
    },
    setSquareOptions: (state: { fill: string, stroke: string, strokeWidth: number, width: number, height: number }) => void,
    addingSquare: boolean,
    setAddingSquare: (state: boolean) => void,

    // Add Circle
    circleOptions: {
        fill: string,
        stroke: string,
        strokeWidth: number,
        circleSize: number,
    },
    setCircleOptions: (state: { fill: string, stroke: string, strokeWidth: number, circleSize: number}) => void,
    addingCircle: boolean,
    setAddingCircle: (state: boolean) => void,

    // Add Horizontal Line
    addHorizontalLine: boolean,
    setAddHorizontalLine: (state: boolean) => void,

    // Add Vertical Line
    addVerticalLine: boolean,
    setAddVerticalLine: (state: boolean) => void,

     // Add Image
     addImg: boolean,
     imgUrl: string,
     setImgUrl: (state: string) => void,
     setAddImg: (state: boolean) => void,

     // Add Video
    addVideo: boolean,
    videoUrl: string,
    setVideoUrl: (state: string) => void,
    setAddVideo: (state: boolean) => void,

}

export default useTools_interface