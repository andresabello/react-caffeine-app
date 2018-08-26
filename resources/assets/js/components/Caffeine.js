import ReactDOM from 'react-dom'
import DrinkOption from './DrinkOption'
import {Alert} from './Alert'
import React, {Component} from 'react'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlusCircle, faTrash} from '@fortawesome/free-solid-svg-icons'

library.add(faPlusCircle, faTrash)

export default class Caffeine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drinks: [],
            selectedDrinks: [{
                id: 1,
                name: 'Monster Ultra Sunrise',
                quantity: 0,
                index: 0
            }],
            message: 'Sample Error',
            display: false,
        }

        this.addDrink = this.addDrink.bind(this)
        this.removeDrink = this.removeDrink.bind(this)
        this.resetDrinks = this.resetDrinks.bind(this)
        this.drinkUpdated = this.drinkUpdated.bind(this)

    }

    componentDidMount() {
        axios.post('/api/drinks', {
            api_token: document.getElementById('user-token').value
        }).then(({data}) => {
            this.setState({
                drinks: data.drinks
            })
        })
    }

    drinkUpdated(drink) {
        let selectedDrinks = this.state.selectedDrinks
        selectedDrinks[drink.index] = drink
        this.setState({selectedDrinks: selectedDrinks})
        this.processDrinks()
    }

    removeDrink(removedIndex) {
        let selectedDrinks = this.state.selectedDrinks.filter((drink, index) => index !== removedIndex)
        this.setState({selectedDrinks: selectedDrinks}, this.processDrinks())
    }

    addDrink() {
        this.processDrinks(true)
    }

    processDrinks(newDrink = false) {
        const token = document.getElementById('user-token')
        const selectedDrinks = this.state.selectedDrinks

        if (token) {
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.value;
        }

        axios.post('/api/drinks/process', {
            selected_drinks: selectedDrinks
        }).then((response) => {

            if (newDrink) {
                response.data.selected_drinks.push({
                    id: 1,
                    name: 'Monster Ultra Sunrise',
                    quantity: 0
                })
            }

            this.setState({
                selectedDrinks: response.data.selected_drinks
            })
        }).catch(({response}) => {
            let message = ''
            if (response.data.errors) {
                let errors = Object.keys(response.data.errors).map(i => response.data.errors[i])

                for (let i=0, l=errors.length; i<l; i++){
                    if (errors[i] instanceof Array){
                        errors[i] = errors[i].join("`");
                    }
                }

                message = errors.join('`')
            }else{
                message = response.data.message
            }

            this.setState({
                message: message,
                display: true
            })

            setTimeout(
                function() {
                    this.setState({display: false});
                }.bind(this), 3000
            )
        })
    }

    resetDrinks() {
        this.processDrinks([{
            id: 1,
            name: 'Monster Ultra Sunrise',
            quantity: 1,
            index: 0
        }])
    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.selectedDrinks.toString())
        event.preventDefault()
    }

    render() {

        const drinks = this.state.drinks
        const options = this.state.selectedDrinks.map((drink, index) =>
            <DrinkOption drink={drink} drinks={drinks} key={index} onDrinkAdded={this.drinkUpdated} onDrinkRemoved={this.removeDrink} id={index}/>
        )

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Caffeine</div>
                            <div className="card-body">

                                <Alert message={this.state.message} display={this.state.display}/>

                                <form>
                                    {options}
                                    <div className="form-row">
                                        <div className="col-sm-8">
                                            <button type="button" className="btn btn-success btn-block"
                                                    onClick={this.addDrink}>Add Current Drink
                                            </button>
                                        </div>
                                        <div className="col-sm-4">
                                            <button type="button" className="btn btn-danger btn-block"
                                                    onClick={this.resetDrinks}>Reset All
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('caffeine-app')) {
    ReactDOM.render(<Caffeine/>, document.getElementById('caffeine-app'));
}
