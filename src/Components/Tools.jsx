//importing tools

import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Inlinecode from "@editorjs/inline-code";


export const Tools ={
    embed :Embed,
    list:{
        class:List,
        inlineToolbar:true
    },
    image:Image,
    header:{
        class:Header,
        config:{
            placeholder:"Type Heading...",
            levels:[2,3],
            defaultLevel:2
        }
    },
    quote:{
        class:Quote,
        inlineToolbar:true
    },
    marker:Marker,
    Inlinecode:Inlinecode
}   
