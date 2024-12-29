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
import { FaRegCircle } from "react-icons/fa";


export default function AddCircle() {

    const {
        // Add Circle
        setCircleOptions,
        setAddingCircle,
    } = useTools();

    // Adding Circle
    const [fillCircleColor, setFillCircleColor] = useState("null"); // Default to "null" for no fill
    const [strokeCircleColor, setStrokeCircleColor] = useState("red"); // Default stroke color
    const [strokeCircleWidth, setStrokeCircleWidth] = useState(1); // Default stroke width
    const [circleSize, setCircleSize] = useState(50); // Default Circle Size
    useEffect(() => {
        setCircleOptions({
            fill: fillCircleColor,
            stroke: strokeCircleColor,
            strokeWidth: strokeCircleWidth,
            circleSize: circleSize,
        });
    }, [fillCircleColor, strokeCircleColor, circleSize, strokeCircleWidth, setCircleOptions]);



    return (
        <Dialog key="addCircle">
            <DialogTrigger>
                <Button variant="outline"><FaRegCircle className="!size-5" /></Button>
            </DialogTrigger>
            <DialogContent className="!min-w-[700px]">
                <DialogHeader>
                    <DialogTitle className="font-semibold text-center">Circle Editor</DialogTitle>
                </DialogHeader>

                <div className="flex flex-row gap-6">
                    {/* Left Side: Controllers */}
                    <div className="flex-1 space-y-4">
                        {/* Fill Color */}
                        <div className="space-y-2">
                            <Label htmlFor="fill">Fill Color</Label>
                            <Select value={fillCircleColor} onValueChange={setFillCircleColor}>
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
                            <Select value={strokeCircleColor} onValueChange={setStrokeCircleColor}>
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
                            <Label htmlFor="strokeWidth">Stroke Width: {strokeCircleWidth}px</Label>
                            <Slider
                                id="strokeWidth"
                                min={1}
                                max={10}
                                step={1}
                                value={[strokeCircleWidth]}
                                onValueChange={(value) => setStrokeCircleWidth(value[0])}
                            />
                        </div>

                        {/* Circle Size */}
                        <div className="space-y-2">
                            <Label htmlFor="circleSize">Circle Diameter: {circleSize}px</Label>
                            <Slider
                                id="circleSize"
                                min={50}
                                max={500}
                                step={1}
                                value={[circleSize]}
                                onValueChange={(value) => setCircleSize(value[0])}
                            />
                        </div>

                        {/* Add circle Button */}
                        <Button
                            className="w-full"
                            onClick={() => { setAddingCircle(true); }}
                            disabled={false}
                        >
                            Add Circle
                        </Button>
                    </div>

                    {/* Right Side: Preview */}
                    <div className="flex-1 flex items-center justify-center">
                        <div
                            className="p-4 border flex items-center justify-center"
                            style={{
                                backgroundColor: fillCircleColor === "null" ? "transparent" : fillCircleColor,
                                border: `${strokeCircleWidth}px solid ${strokeCircleColor}`,
                                borderRadius: '100%',
                                minWidth: 200,
                                minHeight: 200
                            }}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
