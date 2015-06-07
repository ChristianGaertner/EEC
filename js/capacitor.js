var DigitCodes = {
    'sig_figures': {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9
    },
    'multiplier': {}
}

var CapacitorCalc = React.createClass({
    mixins: [SelectHelper, ValueCalculator, ComponentRenderer],
    displayName: 'Capacitor',
    getInitialState: function () {
        return {
            digit1: 1,
            digit2: 0,
            digit3: 1,
            letter: 'K'  
        };
    },
    handleChange: function() {
        var d1 = React.findDOMNode(this.refs.digit1);
        var d2 = React.findDOMNode(this.refs.digit2);
        var d3 = React.findDOMNode(this.refs.digit3);
        var l1 = React.findDOMNode(this.refs.letter);

        this.setState({
            digit1: d1,
            digit2: d2,
            digit3: d3,
            letter: l1
        });
    },
    getCapacitance: function() {
        return this.calcValue(this.state.digit1, this.state.digit2, this.state.digit3);
    },
    getTolerance: function() {
        return this.state.letter * 100;
    },
    render: function () {
        return (
            <div>
                <p>
                    <h5 className="inline">
                        { this.getCapacitance() }F   
                    </h5>
                    <h6 className="inline">
                        &nbsp;w/ &plusmn;{ this.getTolerance() }% tolerance.
                    </h6>  
                </p>
            </div>
        );
    },
    renderItems: function() {
        var createOption = function(type, value) {

        };
    }
});

React.render(<CapacitorCalc />, document.getElementById('capacitor'));