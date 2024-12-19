import { create } from 'zustand';
import useTools_interface from '@/interfaces/tools/useTools_interface';

const useTools = create<useTools_interface>((set) => ({
    textOptions: {
        color: '',
        fontSize: 0,
        text: '',
    },
    setTextOptions: (state) => set({ textOptions: state }),
    handleAddText: false,
    setHandleAddText: (state) => set({ handleAddText: state }),

    // Handle Adding Square
    squareOptions: {
        fill: '', 
        stroke: "",
        strokeWidth: 0,
        width: 0,
        height: 0,
    },
    setSquareOptions: (state) => set({ squareOptions: state }),
    addingSquare: false,
    setAddingSquare: (state) => set({ addingSquare: state }),

     // Handle Adding Circle
     circleOptions: {
        fill: '', 
        stroke: "",
        strokeWidth: 0,
    },
    setCircleOptions: (state) => set({ circleOptions: state }),
    addingCircle: false,
    setAddingCircle: (state) => set({ addingCircle: state }),

    // Handle Horizontal Line
    addHorizontalLine: false,
    setAddHorizontalLine: (state) => set({ addHorizontalLine: state }),

    // Handle Vertical Line
    addVerticalLine: false,
    setAddVerticalLine: (state) => set({ addVerticalLine: state }),
}))

export default useTools;