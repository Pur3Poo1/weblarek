import { Component } from "../base/Component";

interface IGalleryData{
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> {
    set catalog(items: HTMLElement[]){
        this.container.replaceChildren(...items);
    }
}