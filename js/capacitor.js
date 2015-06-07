var DigitCodes = {
    'sig_figure': {
        "0": 0,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "8": 8,
        "9": 9
    },
    'multiplier': {
        "0": 1e-12,
        "1": 1e-11,
        "2": 1e-9,
        "3": 1e-8,
        "4": 1e-7,
        "5": 1e-6,
        "6": 1e-5,
        "7": 1e-4,
        "8": 1e-3,
        "9": 1e-2
    },
    'tolerance': {
        'C': '0.25 pF',
        'D': '0.5 pF',
        'F': '1 %',
        'G': '2 %',
        'J': '5 %',
        'K': '10 %',
        'M': '20 %',
        'Z': '-20% + 80%'
    }
}

var CapacitorCalc = React.createClass({
    mixins: [SelectHelper, ValueCalculator, ComponentRenderer],
    displayName: 'Capacitor',
    getInitialState: function () {
        return {
            digit1: 0,
            digit2: 0,
            digit3: 0,
            letter: DigitCodes[TypeEnum.TOLERANCE]['C']
        };
    },
    handleChange: function() {
        var d1 = React.findDOMNode(this.refs.digit1);
        var d2 = React.findDOMNode(this.refs.digit2);
        var d3 = React.findDOMNode(this.refs.digit3);
        var l1 = React.findDOMNode(this.refs.letter);

        this.setState({
            digit1: d1.value,
            digit2: d2.value,
            digit3: d3.value,
            letter: l1.value
        });
    },
    getCapacitance: function() {
        return this.calcValue(this.state.digit1, this.state.digit2, this.state.digit3);
    },
    getTolerance: function() {
        return this.state.letter;
    },
    render: function () {
        console.log(this.state);
        return this.basicRender(this.renderItems(), this.getCapacitance(), this.getTolerance(), "F", "");
    },
    renderItems: function() {
        return this.basicRenderItems(
            "selection", this.handleChange, DigitCodes,
            [TypeEnum.SIG_FIGURE, TypeEnum.SIG_FIGURE, TypeEnum.MULTIPLIER, TypeEnum.TOLERANCE],
            ["digit1", "digit2", "digit3", "letter"]
        );
    }
});

React.render(<CapacitorCalc />, document.getElementById('capacitor'));