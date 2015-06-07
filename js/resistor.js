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
        'black': 1,
        'brown': 10,
        'red': 100,
        'orange': 1000,
        'yellow': 10000,
        'green': 100000,
        'blue': 100000,
        'violet': 1000000,
        'gray': 10000000,
        'white': 100000000,
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
    mixins: [SelectHelper, ValueCalculator, ComponentRenderer],
    displayName: 'ResistorCalc',
    getInitialState: function () {
        return {
            ring1: 0,
            ring2: 0,
            ring3: 0,
            ring4: 0.01,
            listVisible: false
        };
    },
    updateRectColor: function(ring, node) {
        document
            .getElementById('svg_resistor')
            .getSVGDocument()
            .getElementById('display_ring' + ring)
            .style.fill = node.options[node.selectedIndex].text;
    },
    handleChange: function() {
        var r1 = React.findDOMNode(this.refs.ring1);
        var r2 = React.findDOMNode(this.refs.ring2);
        var r3 = React.findDOMNode(this.refs.ring3);
        var r4 = React.findDOMNode(this.refs.ring4);
        // update state
        this.setState({
            ring1: r1.value,
            ring2: r2.value,
            ring3: r3.value,
            ring4: r4.value
        });

        // update UI
        this.updateRectColor(1, r1);
        this.updateRectColor(2, r2);
        this.updateRectColor(3, r3);
        this.updateRectColor(4, r4);

    },
    getResistance: function() {
        var ohms = this.calcValue(this.state.ring1, this.state.ring2, this.state.ring3);

        if (ohms >= 1000000000) {
            return ohms / 1000000000 + "G";
        }

        if (ohms >= 1000000) {
            return ohms / 1000000 + "M";
        }

        if (ohms >= 1000) {
            return ohms / 1000 + "k";
        }

        return ohms
    },
    getTolerance: function() {
        return this.state.ring4 * 100;
    },
    render: function () {
        return this.basicRender(this.renderItems(), this.getResistance(), this.getTolerance(), "\u03a9", "%")
    },
    renderItems: function() {
        return this.basicRenderItems(
            "selection", this.handleChange, ColorCodes,
            [TypeEnum.SIG_FIGURE, TypeEnum.SIG_FIGURE, TypeEnum.MULTIPLIER, TypeEnum.TOLERANCE],
            ["ring1", "ring2", "ring3", "ring4"]
        );
    }
});

React.render(<ResistorCalc />, document.getElementById('resistor'));