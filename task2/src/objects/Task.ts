export class Task {
    private _id: number
    private _name: string
    private _content: string
    private _createdAt: string
    private _isDone: boolean

    constructor(id: number, name : string ,content : string , createdAt : string, isDone : boolean){
        this._id = id
        this._name = name;
        this._content = content;
        this._createdAt = createdAt;
        this._isDone = isDone;
    } 

    public get id(): number {
        return this._id;
      }
      public set id(value: number) {
        this._id = value;
      }
    
    public get name(): string {
    return this._name;
    }

    public set name(value: string) {
    this._name = value;
    }

    public get content(): string {
      return this._content;
    }
    public set content(value: string) {
      this._content = value;
    }

    public get createdAt(): string {
      return this._createdAt;
    }
    public set createdAt(value: string) {
      this._createdAt = value;
    }

    public get isDone(): boolean {
      return this._isDone;
    }
    public set isDone(value: boolean) {
      this._isDone = value;
    }

    public toString() {
        return `name:${this._name}, content:${this._content}, createdAt:${this._createdAt}, isDone:${this.isDone}`
    }

    public match (id: number){
        return this._id = id
    }
}