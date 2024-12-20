import { useEffect, useState } from "react"

// UI
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// STORES
import useTools from "@/stores/tools/useTools";

// ICONS
import { LuRectangleHorizontal } from "react-icons/lu";


export default function AddSquare() {

    const {
        // Add Square
        setSquareOptions,
        setAddingSquare,
    } = useTools();

     // Adding Square
        const [fillSquareColor, setFillSquareColor] = useState("null"); // Default to "null" for no fill
        const [strokeSquareColor, setStrokeSquareColor] = useState("red"); // Default stroke color
        const [strokeSquareWidth, setStrokeSquareWidth] = useState(1); // Default stroke width
        const [squareWidth, setSquareWidth] = useState(150); // Default width
        const [squareHeight, setSquareHeight] = useState(150); // Default height
        useEffect(() => {
            setSquareOptions({
                fill: fillSquareColor,
                stroke: strokeSquareColor,
                strokeWidth: strokeSquareWidth,
                width: squareWidth,
                height: squareHeight,
            });
        }, [fillSquareColor, strokeSquareColor, strokeSquareWidth, squareWidth, squareHeight]);
    
    

  return (
    <Dialog key="addSquare">
                <DialogTrigger>
                    <Button variant="outline">
                        <LuRectangleHorizontal className="!size-5" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="!min-w-[700px]">
                    <DialogHeader>
                        <DialogTitle className="font-semibold text-center">Square Editor</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-row gap-6">
                        {/* Left Side: Controllers */}
                        <div className="flex-1 space-y-4">
                            {/* Fill Color */}
                            <div className="space-y-2">
                                <Label htmlFor="fill">Fill Color</Label>
                                <Select value={fillSquareColor} onValueChange={setFillSquareColor}>
                                    <SelectTrigger id="fill">
                                        <SelectValue placeholder="Select a fill color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="null">None</SelectItem>
                                        <SelectItem value="black">Black</SelectItem>
                                        <SelectItem value="red">Red</SelectItem>
                                        <SelectItem value="blue">Blue</SelectItem>
                                        <SelectItem value="green">Green</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Stroke Color */}
                            <div className="space-y-2">
                                <Label htmlFor="stroke">Stroke Color</Label>
                                <Select value={strokeSquareColor} onValueChange={setStrokeSquareColor}>
                                    <SelectTrigger id="stroke">
                                        <SelectValue placeholder="Select a stroke color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="red">Red</SelectItem>
                                        <SelectItem value="black">Black</SelectItem>
                                        <SelectItem value="blue">Blue</SelectItem>
                                        <SelectItem value="green">Green</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Stroke Width */}
                            <div className="space-y-2">
                                <Label htmlFor="strokeWidth">Stroke Width: {strokeSquareWidth}px</Label>
                                <Slider
                                    id="strokeWidth"
                                    min={1}
                                    max={10}
                                    step={1}
                                    value={[strokeSquareWidth]}
                                    onValueChange={(value) => setStrokeSquareWidth(value[0])}
                                />
                            </div>

                            {/* Width */}
                            <div className="space-y-2">
                                <Label htmlFor="width">Width: {squareWidth}px</Label>
                                <Slider
                                    id="width"
                                    min={50}
                                    max={300}
                                    step={10}
                                    value={[squareWidth]}
                                    onValueChange={(value) => setSquareWidth(value[0])}
                                />
                            </div>

                            {/* Height */}
                            <div className="space-y-2">
                                <Label htmlFor="height">Height: {squareHeight}px</Label>
                                <Slider
                                    id="height"
                                    min={50}
                                    max={300}
                                    step={10}
                                    value={[squareHeight]}
                                    onValueChange={(value) => setSquareHeight(value[0])}
                                />
                            </div>

                            {/* Add Square Button */}
                            <Button
                                className="w-full"
                                onClick={() => { setAddingSquare(true); }}
                                disabled={false}
                            >
                                Add Square
                            </Button>
                        </div>

                        {/* Right Side: Preview */}
                        <div className="flex-1 flex items-center justify-center">
                            <div
                                className="p-4 border flex items-center justify-center"
                                style={{
                                    width: `${squareWidth}px`,
                                    height: `${squareHeight}px`,
                                    backgroundColor: fillSquareColor === "null" ? "transparent" : fillSquareColor,
                                    border: `${strokeSquareWidth}px solid ${strokeSquareColor}`,
                                }}
                            />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
  )
}
