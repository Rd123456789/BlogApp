export class Post {
    postId: string;
    title: string;
    content: string;
    author: string;
    createdDate: any;
    photo_url :string;

    constructor() {
        this.title = '';
        this.content = '';
        this.photo_url = '';

    }
}
