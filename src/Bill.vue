<template>
    <div class="bill">
        <table class="table table-striped table-hover">
            <thead class="thead-inverse">
            <tr>
                <th>#</th>
                <th v-for="(column, index) in columns" class="col-md-4 col-12">{{column.title}}</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(position, index) in positions">
                <th scope="row">{{index + 1}}</th>
                <EditableCell v-for="(column, index) in columns" :key="index"
                              :type="column.type" :placeholder="column.title"
                              v-model="position[column.name].value" :editable="position[column.name].edit"
                              v-click-outside="(event) => makeNonEditable(position, event)"
                              @dblclick.native="makeSomeEditable(position, column.name, $event)"
                              @keyup.enter.native="makeNonEditable(position, $event)">
                </EditableCell>
                <th><span style="cursor: pointer;" @click="removePosition(position, $event)">Удалить</span></th>
            </tr>
            <tr>
                <th scope="row">{{positions.length + 1}}</th>
                <td colspan="2">Итого</td>
                <td>{{sum}}</td>
                <td>&nbsp;</td>
            </tr>
            </tbody>
        </table>
        <button class="btn btn-primary" @click="addPosition">Добавить</button>
    </div>
</template>

<script>
    import EditableCell from './EditableCell.vue';
    import Position from './Position.js';

    export default {
        data (){
            return {
                positions: [],
                columns: [
                    {name: 'name', title: 'Наименование', type: 'text'},
                    {name: 'count', title: 'Количество', type: 'number'},
                    {name: 'price', title: 'Цена', type: 'text'}
                ]
            }
        },
        components: {
            EditableCell
        },
        mounted () {
            this.$nextTick(function () {
                // Initialization of table
                const table = [
                        ['Зубная щётка', 12,     29.3],
                        [     'Шампунь',  5,      3.7],
                        [     'Пылесос',  1,  4799.99]
                    ];
                this.positions = table.map(function(row){
                    return new Position(row[0],  row[1],  row[2], false);
                });
            })
        },
        methods: {
            addPosition(event){
                // Add empty editable position
                this.positions.push(new Position(null, null, null, true));
            },
            removePosition(position, event){
                this.positions = this.positions.filter((p) => p.id !== position.id);
            },
            makeNonEditable(position, event){
                if(event.type === 'keyup' || event.target.tagName.toLocaleLowerCase() !== 'input')
                    // make noneditable whole position
                    position.set_edit(false, false);
            },
            makeSomeEditable(position, colname, event){
                // make editable one cell named such colname
                position.set_edit(colname, true);
            }
        },
        computed: {
            sum () {
                // return sum of position's costs
                if(this.positions.length)
                    return this.positions.map((x) => x.price.value * x.count.value).reduce((x, y) => x + y);
                return 0;
            }
        }
    }
</script>