/*



 */

export default class Position{
    constructor(name, count, price, edit){
        this._id = Position.last_id;
        this.name = {value: name, edit: edit};
        this.count = {value: count, edit: edit};
        this.price = {value: price, edit: edit};
    }

    static get last_id(){
        if(this._last_id === undefined)
            this._last_id = 1;
        else
            this._last_id++;
        return this._last_id;
    };

    get id(){
        return this._id;
    }

    set_edit(field_name, value){
        let fields = ['name', 'count', 'price'];
        if(field_name) {
            if (fields.indexOf(field_name) !== -1)
                this[field_name].edit = value;
        }
        else {
            let self = this;
            fields.forEach(function(field){
                self[field].edit = value;
            });
        }
    }
}
