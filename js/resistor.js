var TypeEnum = {
    SIG_FIGURE: 'sig_figure',
    MULTIPLIER: 'multiplier',
    TOLERANCE: 'tolerance'
}

var ColorCodes = {
    'sig_figure': {
        'black': 0,
        'brown': 1,
        'red': 2,
        'orange': 3,
        'yellow': 4,
        'green': 5,
        'blue': 6,
        'violet': 7,
        'gray': 8,
        'white': 9
    },
    'multiplier': {
        'black': 10,
        'brown': 100,
        'red': 1000,
        'orange': 10000,
        'yellow': 100000,
        'green': 1000000,
        'blue': 1000000,
        'violet': 10000000,
        'gray': 100000000,
        'white': 1000000000,
        'gold': 0.1,
        'silver': 0.2
    },
    'tolerance': {
        'brown': 0.01,
        'red': 0.02,
        'yellow': 0.05,
        'green': 0.005,
        'blue': 0.0025,
        'violet': 0.001,
        'gray': 0.1,
        'gold': 0.05,
        'silver': 0.1,
        'none': 0.2
    }
}

var ResistorCalc = React.createClass({
    displayName: 'ResistorCalc',
    getInitialState: function () {
        return {
                ring1: 1,
                ring2: 0,
                ring3: 1,
                ring4: 0.2
        };
    },
    handleChange: function() {
        this.setState({
            ring1: React.findDOMNode(this.refs.ring1).value,
            ring2: React.findDOMNode(this.refs.ring2).value,
            ring3: React.findDOMNode(this.refs.ring3).value,
            ring4: React.findDOMNode(this.refs.ring4).value
        });
    },
    getValue: function(type, color) {
        return ColorCodes[type][color];
    },
    getResistance: function() {
        return this.getValue(TypeEnum.SIG_FIGURE, this.state.ring1) * 10
            +  this.getValue(TypeEnum.SIG_FIGURE, this.state.ring2)
            *  this.getValue(TypeEnum.MULTIPLIER, this.state.ring3);
    },
    render: function () {
        return (
            <div>
                <input type="text" ref="ring1" onChange={this.handleChange}/>
                <input type="text" ref="ring2" onChange={this.handleChange}/>
                <input type="text" ref="ring3" onChange={this.handleChange}/>
                <input type="text" ref="ring4" onChange={this.handleChange}/>
                <p>
                    { this.getResistance() }
                </p>
            </div>
        );
    }
});

React.render(<ResistorCalc />, document.getElementById('resistor'));