import React, {Component} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


export default class DrinkOption extends Component {

    constructor(props) {
        super(props)

        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)
        this.onChangeQuantity = this.onChangeQuantity.bind(this)
        this.onChangeDrink = this.onChangeDrink.bind(this)

        this.state = {
            quantity: 0
        }
    }

    onChangeDrink(e) {
        const target = e.target
        const value = target.value
        const selectedDrink = this.props.drinks.find(drink => drink.name === value)
        this.setState({
            drink: selectedDrink
        })

        this.add(selectedDrink, this.state.quantity)
    }

    onChangeQuantity(e) {
        const target = e.target
        const value = target.value
        const newQuantity = Number.isNaN(parseInt(value)) ? '' : parseInt(value)

        this.setState({
            quantity: newQuantity
        })

        this.add(this.props.drink, newQuantity)
    }

    add(drink, quantity) {
        const currentKey = this.props.id
        Object.assign(drink, {
            quantity: quantity,
            index: currentKey
        })
        this.props.onDrinkAdded(drink)
    }

    remove() {
        this.props.onDrinkRemoved(this.props.id)
    }

    render() {
        const selectedDrink = this.props.drink
        const quantity = this.state.quantity

        const listItems = this.props.drinks.map((drink) =>
            <option key={drink.id} value={drink.name}>{drink.name}</option>
        )

        return (
            <div className="form-group">
                <div className="form-row">
                    <div className="col-sm-8">
                        <select name="drink-option" id="drink-option" value={selectedDrink.name}
                                className={'form-control'} onChange={this.onChangeDrink}>
                            {listItems}
                        </select>
                    </div>
                    <div className="col-sm-2">
                        <input type="number" value={quantity} className={'form-control'}
                               onChange={this.onChangeQuantity}/>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-danger btn-block" type="button" onClick={this.remove}><FontAwesomeIcon
                            icon="trash"/></button>
                    </div>
                </div>
            </div>
        )
    }
}