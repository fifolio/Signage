import { useEffect, useState } from "react"

// UI
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea, ScrollBar } from "../ui/scroll-area";


// ICONS
import { IoText } from "react-icons/io5";
import { FcPicture } from "react-icons/fc";
import { FcStart } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";
// import { MdDelete } from "react-icons/md";
import { LuRectangleHorizontal } from "react-icons/lu";
import { FaRegCircle } from "react-icons/fa";
import { GoHorizontalRule } from "react-icons/go";
import { RxDividerVertical } from "react-icons/rx";

// STORES
import { useText } from "@/stores/tools/useText";


export default function Tools() {

    const {
        // Add Text
        setTextOptions,
        setHandleAddText,

        // Add Square
        setSquareOptions,
        setAddingSquare,

        // Add Circle
        setCircleOptions,
        setAddingCircle,

        // Add Horizontal Line
        setAddHorizontalLine,

        // Add Vertical Line
        setAddVerticalLine

    } = useText();

    // Adding Text
    const [text, setText] = useState("");
    const [fontSize, setFontSize] = useState(16);
    const [textColor, setTextColor] = useState("black");
    useEffect(() => {
        setTextOptions({
            color: textColor,
            fontSize,
            text
        })
    }, [text, fontSize, textColor]);


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


    // Adding Circle
    const [fillCircleColor, setFillCircleColor] = useState("null"); // Default to "null" for no fill
    const [strokeCircleColor, setStrokeCircleColor] = useState("red"); // Default stroke color
    const [strokeCircleWidth, setStrokeCircleWidth] = useState(1); // Default stroke width
    useEffect(() => {
        setCircleOptions({
            fill: fillCircleColor,
            stroke: strokeCircleColor,
            strokeWidth: strokeCircleWidth,
        });
    }, [fillCircleColor, strokeCircleColor, strokeCircleWidth]);



    return (
        <div className="space-y-3 flex flex-col items-center">

            {/* ADD TEXT */}
            <Dialog key="addText">
                <DialogTrigger>
                    <Button type="button" variant="outline"><IoText className="!size-5" /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-semibold text-center">Interactive Text Editor</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2">
                        <Label htmlFor="text">Text</Label>
                        <Input
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter your text here"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="fontSize">Font Size: {fontSize}px</Label>
                        <Slider
                            id="fontSize"
                            min={8}
                            max={72}
                            step={1}
                            value={[fontSize]}
                            onValueChange={(value) => setFontSize(value[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="textColor">Text Color</Label>
                        <Select value={textColor} onValueChange={setTextColor}>
                            <SelectTrigger id="textColor">
                                <SelectValue placeholder="Select a color" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="black">Black</SelectItem>
                                <SelectItem value="red">Red</SelectItem>
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="green">Green</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className=" p-4 border rounded-md">
                        <ScrollArea style={{ fontSize: `${fontSize}px`, color: textColor }} className="whitespace-nowrap">
                            <div className="max-w-[200px]">
                                {text || "Preview text"}
                            </div>

                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>


                    <Separator />

                    <Button className="w-full" onClick={() => setHandleAddText(true)}
                        disabled={text == "" || text.length <= 0}>Add text</Button>
                </DialogContent>
            </Dialog>

            <Separator />

            <Dialog>
                <DialogTrigger><Button variant="outline"><FcPicture className="!size-5" /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger><Button variant="outline"><FcStart className="!size-5" /></Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <Separator />

            {/* ADD SQUARE */}
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

            {/* ADD CIRCLE */}
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

            {/* ADD HORIZONTAL LINE */}
            <Button onClick={() => setAddHorizontalLine(true)} variant="outline"><GoHorizontalRule className="!size-5" /></Button>

            {/* ADD VERTICAL LINE */}
            <Button onClick={() => setAddVerticalLine(true)} variant="outline"><RxDividerVertical className="!size-5" /></Button>


            {/* DELETE BTN */}
            {/* <Separator />
            <Button type="button" variant="destructive"><MdDelete className="!size-5 text-white" /></Button> */}


            <Separator />
            <Button variant="outline"><FcInfo className="!size-5" /></Button>
        </div>
    );
}
