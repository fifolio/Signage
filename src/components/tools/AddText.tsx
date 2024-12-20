
import { useEffect, useState } from "react"

// UI
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
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
// STORES
import useTools from "@/stores/tools/useTools";


export default function AddText() {

    const {
        // Add Text
        setTextOptions,
        setHandleAddText,
    } = useTools();

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


    return (
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
    )
}
