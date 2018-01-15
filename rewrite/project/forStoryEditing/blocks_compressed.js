
'use strict';


// Copyright 2012 Google Inc.  Apache License 2.0
Blockly.Blocks.colour = {};
Blockly.Blocks.colour.HUE = 20;
Blockly.Blocks.colour_picker = {
    init: function() {
        this.jsonInit({
            message0: "%1",
            args0: [{
                type: "field_colour",
                name: "COLOUR",
                colour: "#ff0000"
            }],
            output: "Colour",
            colour: Blockly.Blocks.colour.HUE,
            helpUrl: Blockly.Msg.COLOUR_PICKER_HELPURL
        });
        var a = this;
        this.setTooltip(function() {
            var b = a.getParent();
            return b && b.getInputsInline() && b.tooltip || Blockly.Msg.COLOUR_PICKER_TOOLTIP
        })
    }
};
Blockly.Blocks.colour_random = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.COLOUR_RANDOM_TITLE,
            output: "Colour",
            colour: Blockly.Blocks.colour.HUE,
            tooltip: Blockly.Msg.COLOUR_RANDOM_TOOLTIP,
            helpUrl: Blockly.Msg.COLOUR_RANDOM_HELPURL
        })
    }
};
Blockly.Blocks.colour_rgb = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.COLOUR_RGB_HELPURL);
        this.setColour(Blockly.Blocks.colour.HUE);
        this.appendValueInput("RED").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_RGB_TITLE).appendField(Blockly.Msg.COLOUR_RGB_RED);
        this.appendValueInput("GREEN").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_RGB_GREEN);
        this.appendValueInput("BLUE").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_RGB_BLUE);
        this.setOutput(!0, "Colour");
        this.setTooltip(Blockly.Msg.COLOUR_RGB_TOOLTIP)
    }
};
Blockly.Blocks.colour_blend = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.COLOUR_BLEND_HELPURL);
        this.setColour(Blockly.Blocks.colour.HUE);
        this.appendValueInput("COLOUR1").setCheck("Colour").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_BLEND_TITLE).appendField(Blockly.Msg.COLOUR_BLEND_COLOUR1);
        this.appendValueInput("COLOUR2").setCheck("Colour").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_BLEND_COLOUR2);
        this.appendValueInput("RATIO").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.COLOUR_BLEND_RATIO);
        this.setOutput(!0, "Colour");
        this.setTooltip(Blockly.Msg.COLOUR_BLEND_TOOLTIP)
    }
};
Blockly.Blocks.lists = {};
Blockly.Blocks.lists.HUE = 260;
Blockly.Blocks.lists_create_empty = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LISTS_CREATE_EMPTY_TITLE,
            output: "Array",
            colour: Blockly.Blocks.lists.HUE,
            tooltip: Blockly.Msg.LISTS_CREATE_EMPTY_TOOLTIP,
            helpUrl: Blockly.Msg.LISTS_CREATE_EMPTY_HELPURL
        })
    }
};
Blockly.Blocks.lists_create_with = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.LISTS_CREATE_WITH_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(!0, "Array");
        this.setMutator(new Blockly.Mutator(["lists_create_with_item"]));
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_TOOLTIP)
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("items", this.itemCount_);
        return a
    },
    domToMutation: function(a) {
        this.itemCount_ = parseInt(a.getAttribute("items"),
            10);
        this.updateShape_()
    },
    decompose: function(a) {
        var b = a.newBlock("lists_create_with_container");
        b.initSvg();
        for (var c = b.getInput("STACK").connection, e = 0; e < this.itemCount_; e++) {
            var d = a.newBlock("lists_create_with_item");
            d.initSvg();
            c.connect(d.previousConnection);
            c = d.nextConnection
        }
        return b
    },
    compose: function(a) {
        var b = a.getInputTargetBlock("STACK");
        for (a = []; b;) a.push(b.valueConnection_), b = b.nextConnection && b.nextConnection.targetBlock();
        for (b = 0; b < this.itemCount_; b++) {
            var c = this.getInput("ADD" + b).connection.targetConnection;
            c && -1 == a.indexOf(c) && c.disconnect()
        }
        this.itemCount_ = a.length;
        this.updateShape_();
        for (b = 0; b < this.itemCount_; b++) Blockly.Mutator.reconnect(a[b], this, "ADD" + b)
    },
    saveConnections: function(a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = 0; a;) {
            var c = this.getInput("ADD" + b);
            a.valueConnection_ = c && c.connection.targetConnection;
            b++;
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    updateShape_: function() {
        this.itemCount_ && this.getInput("EMPTY") ? this.removeInput("EMPTY") : this.itemCount_ || this.getInput("EMPTY") ||
            this.appendDummyInput("EMPTY").appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
        for (var a = 0; a < this.itemCount_; a++)
            if (!this.getInput("ADD" + a)) {
                var b = this.appendValueInput("ADD" + a);
                0 == a && b.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH)
            }
        for (; this.getInput("ADD" + a);) this.removeInput("ADD" + a), a++
    }
};
Blockly.Blocks.lists_create_with_container = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TITLE_ADD);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_CONTAINER_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.lists_create_with_item = {
    init: function() {
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TITLE);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.LISTS_CREATE_WITH_ITEM_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.lists_repeat = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LISTS_REPEAT_TITLE,
            args0: [{
                type: "input_value",
                name: "ITEM"
            }, {
                type: "input_value",
                name: "NUM",
                check: "Number"
            }],
            output: "Array",
            colour: Blockly.Blocks.lists.HUE,
            tooltip: Blockly.Msg.LISTS_REPEAT_TOOLTIP,
            helpUrl: Blockly.Msg.LISTS_REPEAT_HELPURL
        })
    }
};
Blockly.Blocks.lists_length = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LISTS_LENGTH_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
                check: ["String", "Array"]
            }],
            output: "Number",
            colour: Blockly.Blocks.lists.HUE,
            tooltip: Blockly.Msg.LISTS_LENGTH_TOOLTIP,
            helpUrl: Blockly.Msg.LISTS_LENGTH_HELPURL
        })
    }
};
Blockly.Blocks.lists_isEmpty = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LISTS_ISEMPTY_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
                check: ["String", "Array"]
            }],
            output: "Boolean",
            colour: Blockly.Blocks.lists.HUE,
            tooltip: Blockly.Msg.LISTS_ISEMPTY_TOOLTIP,
            helpUrl: Blockly.Msg.LISTS_ISEMPTY_HELPURL
        })
    }
};
Blockly.Blocks.lists_indexOf = {
    init: function() {
        var a = [
            [Blockly.Msg.LISTS_INDEX_OF_FIRST, "FIRST"],
            [Blockly.Msg.LISTS_INDEX_OF_LAST, "LAST"]
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_INDEX_OF_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.setOutput(!0, "Number");
        this.appendValueInput("VALUE").setCheck("Array").appendField(Blockly.Msg.LISTS_INDEX_OF_INPUT_IN_LIST);
        this.appendValueInput("FIND").appendField(new Blockly.FieldDropdown(a), "END");
        this.setInputsInline(!0);
        this.setTooltip(function() {
            return Blockly.Msg.LISTS_INDEX_OF_TOOLTIP.replace("%1",
                this.workspace.options.oneBasedIndex ? "0" : "-1")
        })
    }
};
Blockly.Blocks.lists_getIndex = {
    init: function() {
        var a = [
            [Blockly.Msg.LISTS_GET_INDEX_GET, "GET"],
            [Blockly.Msg.LISTS_GET_INDEX_GET_REMOVE, "GET_REMOVE"],
            [Blockly.Msg.LISTS_GET_INDEX_REMOVE, "REMOVE"]
        ];
        this.WHERE_OPTIONS = [
            [Blockly.Msg.LISTS_GET_INDEX_FROM_START, "FROM_START"],
            [Blockly.Msg.LISTS_GET_INDEX_FROM_END, "FROM_END"],
            [Blockly.Msg.LISTS_GET_INDEX_FIRST, "FIRST"],
            [Blockly.Msg.LISTS_GET_INDEX_LAST, "LAST"],
            [Blockly.Msg.LISTS_GET_INDEX_RANDOM, "RANDOM"]
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_INDEX_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        a = new Blockly.FieldDropdown(a, function(a) {
            this.sourceBlock_.updateStatement_("REMOVE" == a)
        });
        this.appendValueInput("VALUE").setCheck("Array").appendField(Blockly.Msg.LISTS_GET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput().appendField(a, "MODE").appendField("", "SPACE");
        this.appendDummyInput("AT");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_INDEX_TAIL);
        this.setInputsInline(!0);
        this.setOutput(!0);
        this.updateAt_(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("MODE"),
                e = b.getFieldValue("WHERE"),
                d = "";
            switch (a + " " + e) {
                case "GET FROM_START":
                case "GET FROM_END":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FROM;
                    break;
                case "GET FIRST":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_FIRST;
                    break;
                case "GET LAST":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_LAST;
                    break;
                case "GET RANDOM":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_RANDOM;
                    break;
                case "GET_REMOVE FROM_START":
                case "GET_REMOVE FROM_END":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM;
                    break;
                case "GET_REMOVE FIRST":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST;
                    break;
                case "GET_REMOVE LAST":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST;
                    break;
                case "GET_REMOVE RANDOM":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM;
                    break;
                case "REMOVE FROM_START":
                case "REMOVE FROM_END":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM;
                    break;
                case "REMOVE FIRST":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST;
                    break;
                case "REMOVE LAST":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST;
                    break;
                case "REMOVE RANDOM":
                    d = Blockly.Msg.LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM
            }
            if ("FROM_START" == e || "FROM_END" == e) d += "  " + ("FROM_START" == e ? Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP : Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP).replace("%1", b.workspace.options.oneBasedIndex ? "#1" : "#0");
            return d
        })
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("statement", !this.outputConnection);
        var b = this.getInput("AT").type == Blockly.INPUT_VALUE;
        a.setAttribute("at", b);
        return a
    },
    domToMutation: function(a) {
        var b =
            "true" == a.getAttribute("statement");
        this.updateStatement_(b);
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateStatement_: function(a) {
        a != !this.outputConnection && (this.unplug(!0, !0), a ? (this.setOutput(!1), this.setPreviousStatement(!0), this.setNextStatement(!0)) : (this.setPreviousStatement(!1), this.setNextStatement(!1), this.setOutput(!0)))
    },
    updateAt_: function(a) {
        this.removeInput("AT");
        this.removeInput("ORDINAL", !0);
        a ? (this.appendValueInput("AT").setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX &&
            this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT");
        var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(b) {
            var e = "FROM_START" == b || "FROM_END" == b;
            if (e != a) {
                var d = this.sourceBlock_;
                d.updateAt_(e);
                d.setFieldValue(b, "WHERE");
                return null
            }
        });
        this.getInput("AT").appendField(b, "WHERE");
        Blockly.Msg.LISTS_GET_INDEX_TAIL && this.moveInputBefore("TAIL", null)
    }
};
Blockly.Blocks.lists_setIndex = {
    init: function() {
        var a = [
            [Blockly.Msg.LISTS_SET_INDEX_SET, "SET"],
            [Blockly.Msg.LISTS_SET_INDEX_INSERT, "INSERT"]
        ];
        this.WHERE_OPTIONS = [
            [Blockly.Msg.LISTS_GET_INDEX_FROM_START, "FROM_START"],
            [Blockly.Msg.LISTS_GET_INDEX_FROM_END, "FROM_END"],
            [Blockly.Msg.LISTS_GET_INDEX_FIRST, "FIRST"],
            [Blockly.Msg.LISTS_GET_INDEX_LAST, "LAST"],
            [Blockly.Msg.LISTS_GET_INDEX_RANDOM, "RANDOM"]
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_SET_INDEX_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST").setCheck("Array").appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_IN_LIST);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(a), "MODE").appendField("", "SPACE");
        this.appendDummyInput("AT");
        this.appendValueInput("TO").appendField(Blockly.Msg.LISTS_SET_INDEX_INPUT_TO);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.LISTS_SET_INDEX_TOOLTIP);
        this.updateAt_(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("MODE"),
                e = b.getFieldValue("WHERE"),
                d = "";
            switch (a + " " + e) {
                case "SET FROM_START":
                case "SET FROM_END":
                    d =
                        Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FROM;
                    break;
                case "SET FIRST":
                    d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_FIRST;
                    break;
                case "SET LAST":
                    d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_LAST;
                    break;
                case "SET RANDOM":
                    d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_SET_RANDOM;
                    break;
                case "INSERT FROM_START":
                case "INSERT FROM_END":
                    d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_FROM;
                    break;
                case "INSERT FIRST":
                    d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST;
                    break;
                case "INSERT LAST":
                    d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_LAST;
                    break;
                case "INSERT RANDOM":
                    d = Blockly.Msg.LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM
            }
            if ("FROM_START" == e || "FROM_END" == e) d += "  " + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace("%1", b.workspace.options.oneBasedIndex ? "#1" : "#0");
            return d
        })
    },
    mutationToDom: function() {
        var a = document.createElement("mutation"),
            b = this.getInput("AT").type == Blockly.INPUT_VALUE;
        a.setAttribute("at", b);
        return a
    },
    domToMutation: function(a) {
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateAt_: function(a) {
        this.removeInput("AT");
        this.removeInput("ORDINAL", !0);
        a ? (this.appendValueInput("AT").setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT");
        var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(b) {
            var e = "FROM_START" == b || "FROM_END" == b;
            if (e != a) {
                var d = this.sourceBlock_;
                d.updateAt_(e);
                d.setFieldValue(b, "WHERE");
                return null
            }
        });
        this.moveInputBefore("AT", "TO");
        this.getInput("ORDINAL") && this.moveInputBefore("ORDINAL",
            "TO");
        this.getInput("AT").appendField(b, "WHERE")
    }
};
Blockly.Blocks.lists_getSublist = {
    init: function() {
        this.WHERE_OPTIONS_1 = [
            [Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_START, "FROM_START"],
            [Blockly.Msg.LISTS_GET_SUBLIST_START_FROM_END, "FROM_END"],
            [Blockly.Msg.LISTS_GET_SUBLIST_START_FIRST, "FIRST"]
        ];
        this.WHERE_OPTIONS_2 = [
            [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_START, "FROM_START"],
            [Blockly.Msg.LISTS_GET_SUBLIST_END_FROM_END, "FROM_END"],
            [Blockly.Msg.LISTS_GET_SUBLIST_END_LAST, "LAST"]
        ];
        this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("LIST").setCheck("Array").appendField(Blockly.Msg.LISTS_GET_SUBLIST_INPUT_IN_LIST);
        this.appendDummyInput("AT1");
        this.appendDummyInput("AT2");
        Blockly.Msg.LISTS_GET_SUBLIST_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.LISTS_GET_SUBLIST_TAIL);
        this.setInputsInline(!0);
        this.setOutput(!0, "Array");
        this.updateAt_(1, !0);
        this.updateAt_(2, !0);
        this.setTooltip(Blockly.Msg.LISTS_GET_SUBLIST_TOOLTIP)
    },
    mutationToDom: function() {
        var a = document.createElement("mutation"),
            b = this.getInput("AT1").type ==
            Blockly.INPUT_VALUE;
        a.setAttribute("at1", b);
        b = this.getInput("AT2").type == Blockly.INPUT_VALUE;
        a.setAttribute("at2", b);
        return a
    },
    domToMutation: function(a) {
        var b = "true" == a.getAttribute("at1");
        a = "true" == a.getAttribute("at2");
        this.updateAt_(1, b);
        this.updateAt_(2, a)
    },
    updateAt_: function(a, b) {
        this.removeInput("AT" + a);
        this.removeInput("ORDINAL" + a, !0);
        b ? (this.appendValueInput("AT" + a).setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL" + a).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) :
            this.appendDummyInput("AT" + a);
        var c = new Blockly.FieldDropdown(this["WHERE_OPTIONS_" + a], function(c) {
            var d = "FROM_START" == c || "FROM_END" == c;
            if (d != b) {
                var f = this.sourceBlock_;
                f.updateAt_(a, d);
                f.setFieldValue(c, "WHERE" + a);
                return null
            }
        });
        this.getInput("AT" + a).appendField(c, "WHERE" + a);
        1 == a && (this.moveInputBefore("AT1", "AT2"), this.getInput("ORDINAL1") && this.moveInputBefore("ORDINAL1", "AT2"));
        Blockly.Msg.LISTS_GET_SUBLIST_TAIL && this.moveInputBefore("TAIL", null)
    }
};
Blockly.Blocks.lists_sort = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LISTS_SORT_TITLE,
            args0: [{
                type: "field_dropdown",
                name: "TYPE",
                options: [
                    [Blockly.Msg.LISTS_SORT_TYPE_NUMERIC, "NUMERIC"],
                    [Blockly.Msg.LISTS_SORT_TYPE_TEXT, "TEXT"],
                    [Blockly.Msg.LISTS_SORT_TYPE_IGNORECASE, "IGNORE_CASE"]
                ]
            }, {
                type: "field_dropdown",
                name: "DIRECTION",
                options: [
                    [Blockly.Msg.LISTS_SORT_ORDER_ASCENDING, "1"],
                    [Blockly.Msg.LISTS_SORT_ORDER_DESCENDING, "-1"]
                ]
            }, {
                type: "input_value",
                name: "LIST",
                check: "Array"
            }],
            output: "Array",
            colour: Blockly.Blocks.lists.HUE,
            tooltip: Blockly.Msg.LISTS_SORT_TOOLTIP,
            helpUrl: Blockly.Msg.LISTS_SORT_HELPURL
        })
    }
};
Blockly.Blocks.lists_split = {
    init: function() {
        var a = this,
            b = new Blockly.FieldDropdown([
                [Blockly.Msg.LISTS_SPLIT_LIST_FROM_TEXT, "SPLIT"],
                [Blockly.Msg.LISTS_SPLIT_TEXT_FROM_LIST, "JOIN"]
            ], function(b) {
                a.updateType_(b)
            });
        this.setHelpUrl(Blockly.Msg.LISTS_SPLIT_HELPURL);
        this.setColour(Blockly.Blocks.lists.HUE);
        this.appendValueInput("INPUT").setCheck("String").appendField(b, "MODE");
        this.appendValueInput("DELIM").setCheck("String").appendField(Blockly.Msg.LISTS_SPLIT_WITH_DELIMITER);
        this.setInputsInline(!0);
        this.setOutput(!0, "Array");
        this.setTooltip(function() {
            var b = a.getFieldValue("MODE");
            if ("SPLIT" == b) return Blockly.Msg.LISTS_SPLIT_TOOLTIP_SPLIT;
            if ("JOIN" == b) return Blockly.Msg.LISTS_SPLIT_TOOLTIP_JOIN;
            throw "Unknown mode: " + b;
        })
    },
    updateType_: function(a) {
        "SPLIT" == a ? (this.outputConnection.setCheck("Array"), this.getInput("INPUT").setCheck("String")) : (this.outputConnection.setCheck("String"), this.getInput("INPUT").setCheck("Array"))
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("mode",
            this.getFieldValue("MODE"));
        return a
    },
    domToMutation: function(a) {
        this.updateType_(a.getAttribute("mode"))
    }
};
Blockly.Blocks.logic = {};
Blockly.Blocks.logic.HUE = 210;
Blockly.Blocks.controls_if = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendValueInput("IF0").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput("DO0").appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setMutator(new Blockly.Mutator(["controls_if_elseif", "controls_if_else"]));
        var a = this;
        this.setTooltip(function() {
            if (a.elseifCount_ || a.elseCount_) {
                if (!a.elseifCount_ &&
                    a.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
                if (a.elseifCount_ && !a.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
                if (a.elseifCount_ && a.elseCount_) return Blockly.Msg.CONTROLS_IF_TOOLTIP_4
            } else return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            return ""
        });
        this.elseCount_ = this.elseifCount_ = 0
    },
    mutationToDom: function() {
        if (!this.elseifCount_ && !this.elseCount_) return null;
        var a = document.createElement("mutation");
        this.elseifCount_ && a.setAttribute("elseif", this.elseifCount_);
        this.elseCount_ && a.setAttribute("else",
            1);
        return a
    },
    domToMutation: function(a) {
        this.elseifCount_ = parseInt(a.getAttribute("elseif"), 10) || 0;
        this.elseCount_ = parseInt(a.getAttribute("else"), 10) || 0;
        this.updateShape_()
    },
    decompose: function(a) {
        var b = a.newBlock("controls_if_if");
        b.initSvg();
        for (var c = b.nextConnection, e = 1; e <= this.elseifCount_; e++) {
            var d = a.newBlock("controls_if_elseif");
            d.initSvg();
            c.connect(d.previousConnection);
            c = d.nextConnection
        }
        this.elseCount_ && (a = a.newBlock("controls_if_else"), a.initSvg(), c.connect(a.previousConnection));
        return b
    },
    compose: function(a) {
        var b = a.nextConnection.targetBlock();
        this.elseCount_ = this.elseifCount_ = 0;
        a = [null];
        for (var c = [null], e = null; b;) {
            switch (b.type) {
                case "controls_if_elseif":
                    this.elseifCount_++;
                    a.push(b.valueConnection_);
                    c.push(b.statementConnection_);
                    break;
                case "controls_if_else":
                    this.elseCount_++;
                    e = b.statementConnection_;
                    break;
                default:
                    throw "Unknown block type.";
            }
            b = b.nextConnection && b.nextConnection.targetBlock()
        }
        this.updateShape_();
        for (b = 1; b <= this.elseifCount_; b++) Blockly.Mutator.reconnect(a[b], this,
            "IF" + b), Blockly.Mutator.reconnect(c[b], this, "DO" + b);
        Blockly.Mutator.reconnect(e, this, "ELSE")
    },
    saveConnections: function(a) {
        a = a.nextConnection.targetBlock();
        for (var b = 1; a;) {
            switch (a.type) {
                case "controls_if_elseif":
                    var c = this.getInput("IF" + b),
                        e = this.getInput("DO" + b);
                    a.valueConnection_ = c && c.connection.targetConnection;
                    a.statementConnection_ = e && e.connection.targetConnection;
                    b++;
                    break;
                case "controls_if_else":
                    e = this.getInput("ELSE");
                    a.statementConnection_ = e && e.connection.targetConnection;
                    break;
                default:
                    throw "Unknown block type.";
            }
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    updateShape_: function() {
        this.getInput("ELSE") && this.removeInput("ELSE");
        for (var a = 1; this.getInput("IF" + a);) this.removeInput("IF" + a), this.removeInput("DO" + a), a++;
        for (a = 1; a <= this.elseifCount_; a++) this.appendValueInput("IF" + a).setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF), this.appendStatementInput("DO" + a).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.elseCount_ && this.appendStatementInput("ELSE").appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE)
    }
};
Blockly.Blocks.controls_if_if = {
    init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_IF_TITLE_IF);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_IF_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.controls_if_elseif = {
    init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSEIF_TITLE_ELSEIF);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSEIF_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.controls_if_else = {
    init: function() {
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.CONTROLS_IF_ELSE_TITLE_ELSE);
        this.setPreviousStatement(!0);
        this.setTooltip(Blockly.Msg.CONTROLS_IF_ELSE_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.logic_compare = {
    init: function() {
        var a = [
                ["=", "EQ"],
                ["\u2260", "NEQ"],
                ["\u200f<\u200f", "LT"],
                ["\u200f\u2264\u200f", "LTE"],
                ["\u200f>\u200f", "GT"],
                ["\u200f\u2265\u200f", "GTE"]
            ],
            b = [
                ["=", "EQ"],
                ["\u2260", "NEQ"],
                ["<", "LT"],
                ["\u2264", "LTE"],
                [">", "GT"],
                ["\u2265", "GTE"]
            ],
            a = this.RTL ? a : b;
        this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);
        this.setOutput(!0, "Boolean");
        this.appendValueInput("A");
        this.appendValueInput("B").appendField(new Blockly.FieldDropdown(a),
            "OP");
        this.setInputsInline(!0);
        var c = this;
        this.setTooltip(function() {
            var a = c.getFieldValue("OP");
            return {
                EQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_EQ,
                NEQ: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_NEQ,
                LT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LT,
                LTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_LTE,
                GT: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GT,
                GTE: Blockly.Msg.LOGIC_COMPARE_TOOLTIP_GTE
            }[a]
        });
        this.prevBlocks_ = [null, null]
    },
    onchange: function(a) {
        var b = this.getInputTargetBlock("A"),
            c = this.getInputTargetBlock("B");
        if (b && c && !b.outputConnection.checkType_(c.outputConnection)) {
            Blockly.Events.setGroup(a.group);
            for (a = 0; a < this.prevBlocks_.length; a++) {
                var e = this.prevBlocks_[a];
                if (e === b || e === c) e.unplug(), e.bumpNeighbours_()
            }
            Blockly.Events.setGroup(!1)
        }
        this.prevBlocks_[0] = b;
        this.prevBlocks_[1] = c
    }
};
Blockly.Blocks.logic_operation = {
    init: function() {
        var a = [
            [Blockly.Msg.LOGIC_OPERATION_AND, "AND"],
            [Blockly.Msg.LOGIC_OPERATION_OR, "OR"]
        ];
        this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);
        this.setOutput(!0, "Boolean");
        this.appendValueInput("A").setCheck("Boolean");
        this.appendValueInput("B").setCheck("Boolean").appendField(new Blockly.FieldDropdown(a), "OP");
        this.setInputsInline(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("OP");
            return {
                AND: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_AND,
                OR: Blockly.Msg.LOGIC_OPERATION_TOOLTIP_OR
            }[a]
        })
    }
};
Blockly.Blocks.logic_negate = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LOGIC_NEGATE_TITLE,
            args0: [{
                type: "input_value",
                name: "BOOL",
                check: "Boolean"
            }],
            output: "Boolean",
            colour: Blockly.Blocks.logic.HUE,
            tooltip: Blockly.Msg.LOGIC_NEGATE_TOOLTIP,
            helpUrl: Blockly.Msg.LOGIC_NEGATE_HELPURL
        })
    }
};
Blockly.Blocks.logic_boolean = {
    init: function() {
        this.jsonInit({
            message0: "%1",
            args0: [{
                type: "field_dropdown",
                name: "BOOL",
                options: [
                    [Blockly.Msg.LOGIC_BOOLEAN_TRUE, "TRUE"],
                    [Blockly.Msg.LOGIC_BOOLEAN_FALSE, "FALSE"]
                ]
            }],
            output: "Boolean",
            colour: Blockly.Blocks.logic.HUE,
            tooltip: Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP,
            helpUrl: Blockly.Msg.LOGIC_BOOLEAN_HELPURL
        })
    }
};
Blockly.Blocks.logic_null = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.LOGIC_NULL,
            output: null,
            colour: Blockly.Blocks.logic.HUE,
            tooltip: Blockly.Msg.LOGIC_NULL_TOOLTIP,
            helpUrl: Blockly.Msg.LOGIC_NULL_HELPURL
        })
    }
};
Blockly.Blocks.logic_ternary = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.LOGIC_TERNARY_HELPURL);
        this.setColour(Blockly.Blocks.logic.HUE);
        this.appendValueInput("IF").setCheck("Boolean").appendField(Blockly.Msg.LOGIC_TERNARY_CONDITION);
        this.appendValueInput("THEN").appendField(Blockly.Msg.LOGIC_TERNARY_IF_TRUE);
        this.appendValueInput("ELSE").appendField(Blockly.Msg.LOGIC_TERNARY_IF_FALSE);
        this.setOutput(!0);
        this.setTooltip(Blockly.Msg.LOGIC_TERNARY_TOOLTIP);
        this.prevParentConnection_ = null
    },
    onchange: function(a) {
        var b =
            this.getInputTargetBlock("THEN"),
            c = this.getInputTargetBlock("ELSE"),
            e = this.outputConnection.targetConnection;
        if ((b || c) && e)
            for (var d = 0; 2 > d; d++) {
                var f = 1 == d ? b : c;
                f && !f.outputConnection.checkType_(e) && (Blockly.Events.setGroup(a.group), e === this.prevParentConnection_ ? (this.unplug(), e.getSourceBlock().bumpNeighbours_()) : (f.unplug(), f.bumpNeighbours_()), Blockly.Events.setGroup(!1))
            }
        this.prevParentConnection_ = e
    }
};
Blockly.Blocks.loops = {};
Blockly.Blocks.loops.HUE = 120;
Blockly.Blocks.controls_repeat_ext = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.CONTROLS_REPEAT_TITLE,
            args0: [{
                type: "input_value",
                name: "TIMES",
                check: "Number"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.loops.HUE,
            tooltip: Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
            helpUrl: Blockly.Msg.CONTROLS_REPEAT_HELPURL
        });
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO)
    }
};
Blockly.Blocks.controls_repeat = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.CONTROLS_REPEAT_TITLE,
            args0: [{
                type: "field_number",
                name: "TIMES",
                value: 10,
                min: 0,
                precision: 1
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.loops.HUE,
            tooltip: Blockly.Msg.CONTROLS_REPEAT_TOOLTIP,
            helpUrl: Blockly.Msg.CONTROLS_REPEAT_HELPURL
        });
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO)
    }
};
Blockly.Blocks.controls_whileUntil = {
    init: function() {
        var a = [
            [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_WHILE, "WHILE"],
            [Blockly.Msg.CONTROLS_WHILEUNTIL_OPERATOR_UNTIL, "UNTIL"]
        ];
        this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
        this.setColour(Blockly.Blocks.loops.HUE);
        this.appendValueInput("BOOL").setCheck("Boolean").appendField(new Blockly.FieldDropdown(a), "MODE");
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_WHILEUNTIL_INPUT_DO);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("MODE");
            return {
                WHILE: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_WHILE,
                UNTIL: Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL
            }[a]
        })
    }
};
Blockly.Blocks.controls_for = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.CONTROLS_FOR_TITLE,
            args0: [{
                type: "field_variable",
                name: "VAR",
                variable: null
            }, {
                type: "input_value",
                name: "FROM",
                check: "Number",
                align: "RIGHT"
            }, {
                type: "input_value",
                name: "TO",
                check: "Number",
                align: "RIGHT"
            }, {
                type: "input_value",
                name: "BY",
                check: "Number",
                align: "RIGHT"
            }],
            inputsInline: !0,
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.loops.HUE,
            helpUrl: Blockly.Msg.CONTROLS_FOR_HELPURL
        });
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_FOR_INPUT_DO);
        var a = this;
        this.setTooltip(function() {
            return Blockly.Msg.CONTROLS_FOR_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        })
    },
    customContextMenu: function(a) {
        if (!this.isCollapsed()) {
            var b = {
                    enabled: !0
                },
                c = this.getFieldValue("VAR");
            b.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", c);
            c = goog.dom.createDom("field", null, c);
            c.setAttribute("name", "VAR");
            c = goog.dom.createDom("block", null, c);
            c.setAttribute("type", "variables_get");
            b.callback = Blockly.ContextMenu.callbackFactory(this, c);
            a.push(b)
        }
    }
};
Blockly.Blocks.controls_forEach = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.CONTROLS_FOREACH_TITLE,
            args0: [{
                type: "field_variable",
                name: "VAR",
                variable: null
            }, {
                type: "input_value",
                name: "LIST",
                check: "Array"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.loops.HUE,
            helpUrl: Blockly.Msg.CONTROLS_FOREACH_HELPURL
        });
        this.appendStatementInput("DO").appendField(Blockly.Msg.CONTROLS_FOREACH_INPUT_DO);
        var a = this;
        this.setTooltip(function() {
            return Blockly.Msg.CONTROLS_FOREACH_TOOLTIP.replace("%1",
                a.getFieldValue("VAR"))
        })
    },
    customContextMenu: Blockly.Blocks.controls_for.customContextMenu
};
Blockly.Blocks.controls_flow_statements = {
    init: function() {
        var a = [
            [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK, "BREAK"],
            [Blockly.Msg.CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE, "CONTINUE"]
        ];
        this.setHelpUrl(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_HELPURL);
        this.setColour(Blockly.Blocks.loops.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(a), "FLOW");
        this.setPreviousStatement(!0);
        var b = this;
        this.setTooltip(function() {
            var a = b.getFieldValue("FLOW");
            return {
                BREAK: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK,
                CONTINUE: Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE
            }[a]
        })
    },
    onchange: function(a) {
        a = !1;
        var b = this;
        do {
            if (-1 != this.LOOP_TYPES.indexOf(b.type)) {
                a = !0;
                break
            }
            b = b.getSurroundParent()
        } while (b);
        a ? this.setWarningText(null) : this.setWarningText(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_WARNING)
    },
    LOOP_TYPES: ["controls_repeat", "controls_repeat_ext", "controls_forEach", "controls_for", "controls_whileUntil"]
};
Blockly.Blocks.math = {};
Blockly.Blocks.math.HUE = 230;
Blockly.Blocks.math_number = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.MATH_NUMBER_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldNumber("0"), "NUM");
        this.setOutput(!0, "Number");
        var a = this;
        this.setTooltip(function() {
            var b = a.getParent();
            return b && b.getInputsInline() && b.tooltip || Blockly.Msg.MATH_NUMBER_TOOLTIP
        })
    }
};
Blockly.Blocks.math_arithmetic = {
    init: function() {
        this.jsonInit({
            message0: "%1 %2 %3",
            args0: [{
                type: "input_value",
                name: "A",
                check: "Number"
            }, {
                type: "field_dropdown",
                name: "OP",
                options: [
                    [Blockly.Msg.MATH_ADDITION_SYMBOL, "ADD"],
                    [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, "MINUS"],
                    [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, "MULTIPLY"],
                    [Blockly.Msg.MATH_DIVISION_SYMBOL, "DIVIDE"],
                    [Blockly.Msg.MATH_POWER_SYMBOL, "POWER"]
                ]
            }, {
                type: "input_value",
                name: "B",
                check: "Number"
            }],
            inputsInline: !0,
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            helpUrl: Blockly.Msg.MATH_ARITHMETIC_HELPURL
        });
        var a = this;
        this.setTooltip(function() {
            var b = a.getFieldValue("OP");
            return {
                ADD: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
                MINUS: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
                MULTIPLY: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
                DIVIDE: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE,
                POWER: Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_POWER
            }[b]
        })
    }
};
Blockly.Blocks.math_single = {
    init: function() {
        this.jsonInit({
            message0: "%1 %2",
            args0: [{
                type: "field_dropdown",
                name: "OP",
                options: [
                    [Blockly.Msg.MATH_SINGLE_OP_ROOT, "ROOT"],
                    [Blockly.Msg.MATH_SINGLE_OP_ABSOLUTE, "ABS"],
                    ["-", "NEG"],
                    ["ln", "LN"],
                    ["log10", "LOG10"],
                    ["e^", "EXP"],
                    ["10^", "POW10"]
                ]
            }, {
                type: "input_value",
                name: "NUM",
                check: "Number"
            }],
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            helpUrl: Blockly.Msg.MATH_SINGLE_HELPURL
        });
        var a = this;
        this.setTooltip(function() {
            var b = a.getFieldValue("OP");
            return {
                ROOT: Blockly.Msg.MATH_SINGLE_TOOLTIP_ROOT,
                ABS: Blockly.Msg.MATH_SINGLE_TOOLTIP_ABS,
                NEG: Blockly.Msg.MATH_SINGLE_TOOLTIP_NEG,
                LN: Blockly.Msg.MATH_SINGLE_TOOLTIP_LN,
                LOG10: Blockly.Msg.MATH_SINGLE_TOOLTIP_LOG10,
                EXP: Blockly.Msg.MATH_SINGLE_TOOLTIP_EXP,
                POW10: Blockly.Msg.MATH_SINGLE_TOOLTIP_POW10
            }[b]
        })
    }
};
Blockly.Blocks.math_trig = {
    init: function() {
        this.jsonInit({
            message0: "%1 %2",
            args0: [{
                type: "field_dropdown",
                name: "OP",
                options: [
                    [Blockly.Msg.MATH_TRIG_SIN, "SIN"],
                    [Blockly.Msg.MATH_TRIG_COS, "COS"],
                    [Blockly.Msg.MATH_TRIG_TAN, "TAN"],
                    [Blockly.Msg.MATH_TRIG_ASIN, "ASIN"],
                    [Blockly.Msg.MATH_TRIG_ACOS, "ACOS"],
                    [Blockly.Msg.MATH_TRIG_ATAN, "ATAN"]
                ]
            }, {
                type: "input_value",
                name: "NUM",
                check: "Number"
            }],
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            helpUrl: Blockly.Msg.MATH_TRIG_HELPURL
        });
        var a = this;
        this.setTooltip(function() {
            var b =
                a.getFieldValue("OP");
            return {
                SIN: Blockly.Msg.MATH_TRIG_TOOLTIP_SIN,
                COS: Blockly.Msg.MATH_TRIG_TOOLTIP_COS,
                TAN: Blockly.Msg.MATH_TRIG_TOOLTIP_TAN,
                ASIN: Blockly.Msg.MATH_TRIG_TOOLTIP_ASIN,
                ACOS: Blockly.Msg.MATH_TRIG_TOOLTIP_ACOS,
                ATAN: Blockly.Msg.MATH_TRIG_TOOLTIP_ATAN
            }[b]
        })
    }
};
Blockly.Blocks.math_constant = {
    init: function() {
        this.jsonInit({
            message0: "%1",
            args0: [{
                type: "field_dropdown",
                name: "CONSTANT",
                options: [
                    ["\u03c0", "PI"],
                    ["e", "E"],
                    ["\u03c6", "GOLDEN_RATIO"],
                    ["sqrt(2)", "SQRT2"],
                    ["sqrt(\u00bd)", "SQRT1_2"],
                    ["\u221e", "INFINITY"]
                ]
            }],
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: Blockly.Msg.MATH_CONSTANT_TOOLTIP,
            helpUrl: Blockly.Msg.MATH_CONSTANT_HELPURL
        })
    }
};
Blockly.Blocks.math_number_property = {
    init: function() {
        var a = [
            [Blockly.Msg.MATH_IS_EVEN, "EVEN"],
            [Blockly.Msg.MATH_IS_ODD, "ODD"],
            [Blockly.Msg.MATH_IS_PRIME, "PRIME"],
            [Blockly.Msg.MATH_IS_WHOLE, "WHOLE"],
            [Blockly.Msg.MATH_IS_POSITIVE, "POSITIVE"],
            [Blockly.Msg.MATH_IS_NEGATIVE, "NEGATIVE"],
            [Blockly.Msg.MATH_IS_DIVISIBLE_BY, "DIVISIBLE_BY"]
        ];
        this.setColour(Blockly.Blocks.math.HUE);
        this.appendValueInput("NUMBER_TO_CHECK").setCheck("Number");
        a = new Blockly.FieldDropdown(a, function(a) {
            this.sourceBlock_.updateShape_("DIVISIBLE_BY" ==
                a)
        });
        this.appendDummyInput().appendField(a, "PROPERTY");
        this.setInputsInline(!0);
        this.setOutput(!0, "Boolean");
        this.setTooltip(Blockly.Msg.MATH_IS_TOOLTIP)
    },
    mutationToDom: function() {
        var a = document.createElement("mutation"),
            b = "DIVISIBLE_BY" == this.getFieldValue("PROPERTY");
        a.setAttribute("divisor_input", b);
        return a
    },
    domToMutation: function(a) {
        a = "true" == a.getAttribute("divisor_input");
        this.updateShape_(a)
    },
    updateShape_: function(a) {
        var b = this.getInput("DIVISOR");
        a ? b || this.appendValueInput("DIVISOR").setCheck("Number") :
            b && this.removeInput("DIVISOR")
    }
};
Blockly.Blocks.math_change = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_CHANGE_TITLE,
            args0: [{
                type: "field_variable",
                name: "VAR",
                variable: Blockly.Msg.MATH_CHANGE_TITLE_ITEM
            }, {
                type: "input_value",
                name: "DELTA",
                check: "Number"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.variables.HUE,
            helpUrl: Blockly.Msg.MATH_CHANGE_HELPURL
        });
        var a = this;
        this.setTooltip(function() {
            return Blockly.Msg.MATH_CHANGE_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        })
    }
};
Blockly.Blocks.math_round = {
    init: function() {
        this.jsonInit({
            message0: "%1 %2",
            args0: [{
                type: "field_dropdown",
                name: "OP",
                options: [
                    [Blockly.Msg.MATH_ROUND_OPERATOR_ROUND, "ROUND"],
                    [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDUP, "ROUNDUP"],
                    [Blockly.Msg.MATH_ROUND_OPERATOR_ROUNDDOWN, "ROUNDDOWN"]
                ]
            }, {
                type: "input_value",
                name: "NUM",
                check: "Number"
            }],
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: Blockly.Msg.MATH_ROUND_TOOLTIP,
            helpUrl: Blockly.Msg.MATH_ROUND_HELPURL
        })
    }
};
Blockly.Blocks.math_on_list = {
    init: function() {
        var a = [
                [Blockly.Msg.MATH_ONLIST_OPERATOR_SUM, "SUM"],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MIN, "MIN"],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MAX, "MAX"],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_AVERAGE, "AVERAGE"],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MEDIAN, "MEDIAN"],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_MODE, "MODE"],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_STD_DEV, "STD_DEV"],
                [Blockly.Msg.MATH_ONLIST_OPERATOR_RANDOM, "RANDOM"]
            ],
            b = this;
        this.setHelpUrl(Blockly.Msg.MATH_ONLIST_HELPURL);
        this.setColour(Blockly.Blocks.math.HUE);
        this.setOutput(!0, "Number");
        a = new Blockly.FieldDropdown(a, function(a) {
            b.updateType_(a)
        });
        this.appendValueInput("LIST").setCheck("Array").appendField(a, "OP");
        this.setTooltip(function() {
            var a = b.getFieldValue("OP");
            return {
                SUM: Blockly.Msg.MATH_ONLIST_TOOLTIP_SUM,
                MIN: Blockly.Msg.MATH_ONLIST_TOOLTIP_MIN,
                MAX: Blockly.Msg.MATH_ONLIST_TOOLTIP_MAX,
                AVERAGE: Blockly.Msg.MATH_ONLIST_TOOLTIP_AVERAGE,
                MEDIAN: Blockly.Msg.MATH_ONLIST_TOOLTIP_MEDIAN,
                MODE: Blockly.Msg.MATH_ONLIST_TOOLTIP_MODE,
                STD_DEV: Blockly.Msg.MATH_ONLIST_TOOLTIP_STD_DEV,
                RANDOM: Blockly.Msg.MATH_ONLIST_TOOLTIP_RANDOM
            }[a]
        })
    },
    updateType_: function(a) {
        "MODE" == a ? this.outputConnection.setCheck("Array") : this.outputConnection.setCheck("Number")
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("op", this.getFieldValue("OP"));
        return a
    },
    domToMutation: function(a) {
        this.updateType_(a.getAttribute("op"))
    }
};
Blockly.Blocks.math_modulo = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_MODULO_TITLE,
            args0: [{
                type: "input_value",
                name: "DIVIDEND",
                check: "Number"
            }, {
                type: "input_value",
                name: "DIVISOR",
                check: "Number"
            }],
            inputsInline: !0,
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: Blockly.Msg.MATH_MODULO_TOOLTIP,
            helpUrl: Blockly.Msg.MATH_MODULO_HELPURL
        })
    }
};
Blockly.Blocks.math_constrain = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_CONSTRAIN_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
                check: "Number"
            }, {
                type: "input_value",
                name: "LOW",
                check: "Number"
            }, {
                type: "input_value",
                name: "HIGH",
                check: "Number"
            }],
            inputsInline: !0,
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: Blockly.Msg.MATH_CONSTRAIN_TOOLTIP,
            helpUrl: Blockly.Msg.MATH_CONSTRAIN_HELPURL
        })
    }
};
Blockly.Blocks.math_random_int = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_RANDOM_INT_TITLE,
            args0: [{
                type: "input_value",
                name: "FROM",
                check: "Number"
            }, {
                type: "input_value",
                name: "TO",
                check: "Number"
            }],
            inputsInline: !0,
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: Blockly.Msg.MATH_RANDOM_INT_TOOLTIP,
            helpUrl: Blockly.Msg.MATH_RANDOM_INT_HELPURL
        })
    }
};
Blockly.Blocks.math_random_float = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.MATH_RANDOM_FLOAT_TITLE_RANDOM,
            output: "Number",
            colour: Blockly.Blocks.math.HUE,
            tooltip: Blockly.Msg.MATH_RANDOM_FLOAT_TOOLTIP,
            helpUrl: Blockly.Msg.MATH_RANDOM_FLOAT_HELPURL
        })
    }
};
Blockly.Blocks.procedures = {};
Blockly.Blocks.procedures.HUE = 290;
Blockly.Blocks.procedures_defnoreturn = {
    init: function() {
        var a = new Blockly.FieldTextInput(Blockly.Msg.PROCEDURES_DEFNORETURN_PROCEDURE, Blockly.Procedures.rename);
        a.setSpellcheck(!1);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_TITLE).appendField(a, "NAME").appendField("", "PARAMS");
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
        (this.workspace.options.comments || this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments) &&
        Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT && this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFNORETURN_HELPURL);
        this.arguments_ = [];
        this.setStatements_(!0);
        this.statementConnection_ = null
    },
    setStatements_: function(a) {
        this.hasStatements_ !== a && (a ? (this.appendStatementInput("STACK").appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO), this.getInput("RETURN") &&
            this.moveInputBefore("STACK", "RETURN")) : this.removeInput("STACK", !0), this.hasStatements_ = a)
    },
    updateParams_: function() {
        for (var a = !1, b = {}, c = 0; c < this.arguments_.length; c++) {
            if (b["arg_" + this.arguments_[c].toLowerCase()]) {
                a = !0;
                break
            }
            b["arg_" + this.arguments_[c].toLowerCase()] = !0
        }
        a ? this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING) : this.setWarningText(null);
        a = "";
        this.arguments_.length && (a = Blockly.Msg.PROCEDURES_BEFORE_PARAMS + " " + this.arguments_.join(", "));
        Blockly.Events.disable();
        try {
            this.setFieldValue(a,
                "PARAMS")
        } finally {
            Blockly.Events.enable()
        }
    },
    mutationToDom: function(a) {
        var b = document.createElement("mutation");
        a && b.setAttribute("name", this.getFieldValue("NAME"));
        for (var c = 0; c < this.arguments_.length; c++) {
            var e = document.createElement("arg");
            e.setAttribute("name", this.arguments_[c]);
            a && this.paramIds_ && e.setAttribute("paramId", this.paramIds_[c]);
            b.appendChild(e)
        }
        this.hasStatements_ || b.setAttribute("statements", "false");
        return b
    },
    domToMutation: function(a) {
        this.arguments_ = [];
        for (var b = 0, c; c = a.childNodes[b]; b++) "arg" ==
            c.nodeName.toLowerCase() && this.arguments_.push(c.getAttribute("name"));
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);
        this.setStatements_("false" !== a.getAttribute("statements"))
    },
    decompose: function(a) {
        var b = a.newBlock("procedures_mutatorcontainer");
        b.initSvg();
        this.getInput("RETURN") ? b.setFieldValue(this.hasStatements_ ? "TRUE" : "FALSE", "STATEMENTS") : b.getInput("STATEMENT_INPUT").setVisible(!1);
        for (var c = b.getInput("STACK").connection, e = 0; e < this.arguments_.length; e++) {
            var d = a.newBlock("procedures_mutatorarg");
            d.initSvg();
            d.setFieldValue(this.arguments_[e], "NAME");
            d.oldLocation = e;
            c.connect(d.previousConnection);
            c = d.nextConnection
        }
        Blockly.Procedures.mutateCallers(this);
        return b
    },
    compose: function(a) {
        this.arguments_ = [];
        this.paramIds_ = [];
        for (var b = a.getInputTargetBlock("STACK"); b;) this.arguments_.push(b.getFieldValue("NAME")), this.paramIds_.push(b.id), b = b.nextConnection && b.nextConnection.targetBlock();
        this.updateParams_();
        Blockly.Procedures.mutateCallers(this);
        a = a.getFieldValue("STATEMENTS");
        if (null !== a && (a =
                "TRUE" == a, this.hasStatements_ != a))
            if (a) this.setStatements_(!0), Blockly.Mutator.reconnect(this.statementConnection_, this, "STACK"), this.statementConnection_ = null;
            else {
                a = this.getInput("STACK").connection;
                if (this.statementConnection_ = a.targetConnection) a = a.targetBlock(), a.unplug(), a.bumpNeighbours_();
                this.setStatements_(!1)
            }
    },
    getProcedureDef: function() {
        return [this.getFieldValue("NAME"), this.arguments_, !1]
    },
    getVars: function() {
        return this.arguments_
    },
    renameVar: function(a, b) {
        for (var c = !1, e = 0; e < this.arguments_.length; e++) Blockly.Names.equals(a,
            this.arguments_[e]) && (this.arguments_[e] = b, c = !0);
        if (c && (this.updateParams_(), this.mutator.isVisible()))
            for (var c = this.mutator.workspace_.getAllBlocks(), e = 0, d; d = c[e]; e++) "procedures_mutatorarg" == d.type && Blockly.Names.equals(a, d.getFieldValue("NAME")) && d.setFieldValue(b, "NAME")
    },
    customContextMenu: function(a) {
        var b = {
                enabled: !0
            },
            c = this.getFieldValue("NAME");
        b.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace("%1", c);
        var e = goog.dom.createDom("mutation");
        e.setAttribute("name", c);
        for (var d = 0; d < this.arguments_.length; d++) c =
            goog.dom.createDom("arg"), c.setAttribute("name", this.arguments_[d]), e.appendChild(c);
        e = goog.dom.createDom("block", null, e);
        e.setAttribute("type", this.callType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, e);
        a.push(b);
        if (!this.isCollapsed())
            for (d = 0; d < this.arguments_.length; d++) b = {
                enabled: !0
            }, c = this.arguments_[d], b.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace("%1", c), e = goog.dom.createDom("field", null, c), e.setAttribute("name", "VAR"), e = goog.dom.createDom("block", null, e), e.setAttribute("type",
                "variables_get"), b.callback = Blockly.ContextMenu.callbackFactory(this, e), a.push(b)
    },
    callType_: "procedures_callnoreturn"
};
Blockly.Blocks.procedures_defreturn = {
    init: function() {
        var a = new Blockly.FieldTextInput(Blockly.Msg.PROCEDURES_DEFRETURN_PROCEDURE, Blockly.Procedures.rename);
        a.setSpellcheck(!1);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_DEFRETURN_TITLE).appendField(a, "NAME").appendField("", "PARAMS");
        this.appendValueInput("RETURN").setAlign(Blockly.ALIGN_RIGHT).appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setMutator(new Blockly.Mutator(["procedures_mutatorarg"]));
        (this.workspace.options.comments ||
            this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments) && Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT && this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_DEFRETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_DEFRETURN_HELPURL);
        this.arguments_ = [];
        this.setStatements_(!0);
        this.statementConnection_ = null
    },
    setStatements_: Blockly.Blocks.procedures_defnoreturn.setStatements_,
    updateParams_: Blockly.Blocks.procedures_defnoreturn.updateParams_,
    mutationToDom: Blockly.Blocks.procedures_defnoreturn.mutationToDom,
    domToMutation: Blockly.Blocks.procedures_defnoreturn.domToMutation,
    decompose: Blockly.Blocks.procedures_defnoreturn.decompose,
    compose: Blockly.Blocks.procedures_defnoreturn.compose,
    getProcedureDef: function() {
        return [this.getFieldValue("NAME"), this.arguments_, !0]
    },
    getVars: Blockly.Blocks.procedures_defnoreturn.getVars,
    renameVar: Blockly.Blocks.procedures_defnoreturn.renameVar,
    customContextMenu: Blockly.Blocks.procedures_defnoreturn.customContextMenu,
    callType_: "procedures_callreturn"
};
Blockly.Blocks.procedures_mutatorcontainer = {
    init: function() {
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TITLE);
        this.appendStatementInput("STACK");
        this.appendDummyInput("STATEMENT_INPUT").appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS).appendField(new Blockly.FieldCheckbox("TRUE"), "STATEMENTS");
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORCONTAINER_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.procedures_mutatorarg = {
    init: function() {
        var a = new Blockly.FieldTextInput("x", this.validator_);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_MUTATORARG_TITLE).appendField(a, "NAME");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_MUTATORARG_TOOLTIP);
        this.contextMenu = !1;
        a.onFinishEditing_ = this.createNewVar_;
        a.onFinishEditing_("x")
    },
    validator_: function(a) {
        return (a = a.replace(/[\s\xa0]+/g,
            " ").replace(/^ | $/g, "")) || null
    },
    createNewVar_: function(a) {
        var b = this.sourceBlock_;
        b && b.workspace && b.workspace.options && b.workspace.options.parentWorkspace && b.workspace.options.parentWorkspace.createVariable(a)
    }
};
Blockly.Blocks.procedures_callnoreturn = {
    init: function() {
        this.appendDummyInput("TOPROW").appendField(this.id, "NAME");
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLNORETURN_HELPURL);
        this.arguments_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null
    },
    getProcedureCall: function() {
        return this.getFieldValue("NAME")
    },
    renameProcedure: function(a, b) {
        Blockly.Names.equals(a, this.getProcedureCall()) && (this.setFieldValue(b,
            "NAME"), this.setTooltip((this.outputConnection ? Blockly.Msg.PROCEDURES_CALLRETURN_TOOLTIP : Blockly.Msg.PROCEDURES_CALLNORETURN_TOOLTIP).replace("%1", b)))
    },
    setProcedureParameters_: function(a, b) {
        var c = Blockly.Procedures.getDefinition(this.getProcedureCall(), this.workspace),
            e = c && c.mutator && c.mutator.isVisible();
        e || (this.quarkConnections_ = {}, this.quarkIds_ = null);
        if (b)
            if (goog.array.equals(this.arguments_, a)) this.quarkIds_ = b;
            else {
                if (b.length != a.length) throw "Error: paramNames and paramIds must be the same length.";
                this.setCollapsed(!1);
                this.quarkIds_ || (this.quarkConnections_ = {}, a.join("\n") == this.arguments_.join("\n") ? this.quarkIds_ = b : this.quarkIds_ = []);
                c = this.rendered;
                this.rendered = !1;
                for (var d = 0; d < this.arguments_.length; d++) {
                    var f = this.getInput("ARG" + d);
                    f && (f = f.connection.targetConnection, this.quarkConnections_[this.quarkIds_[d]] = f, e && f && -1 == b.indexOf(this.quarkIds_[d]) && (f.disconnect(), f.getSourceBlock().bumpNeighbours_()))
                }
                this.arguments_ = [].concat(a);
                this.updateShape_();
                if (this.quarkIds_ = b)
                    for (d = 0; d < this.arguments_.length; d++) e =
                        this.quarkIds_[d], e in this.quarkConnections_ && (f = this.quarkConnections_[e], Blockly.Mutator.reconnect(f, this, "ARG" + d) || delete this.quarkConnections_[e]);
                (this.rendered = c) && this.render()
            }
    },
    updateShape_: function() {
        for (var a = 0; a < this.arguments_.length; a++) {
            var b = this.getField("ARGNAME" + a);
            if (b) {
                Blockly.Events.disable();
                try {
                    b.setValue(this.arguments_[a])
                } finally {
                    Blockly.Events.enable()
                }
            } else b = new Blockly.FieldLabel(this.arguments_[a]), this.appendValueInput("ARG" + a).setAlign(Blockly.ALIGN_RIGHT).appendField(b,
                "ARGNAME" + a).init()
        }
        for (; this.getInput("ARG" + a);) this.removeInput("ARG" + a), a++;
        if (a = this.getInput("TOPROW")) this.arguments_.length ? this.getField("WITH") || (a.appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS, "WITH"), a.init()) : this.getField("WITH") && a.removeField("WITH")
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("name", this.getProcedureCall());
        for (var b = 0; b < this.arguments_.length; b++) {
            var c = document.createElement("arg");
            c.setAttribute("name", this.arguments_[b]);
            a.appendChild(c)
        }
        return a
    },
    domToMutation: function(a) {
        var b = a.getAttribute("name");
        this.renameProcedure(this.getProcedureCall(), b);
        for (var b = [], c = [], e = 0, d; d = a.childNodes[e]; e++) "arg" == d.nodeName.toLowerCase() && (b.push(d.getAttribute("name")), c.push(d.getAttribute("paramId")));
        this.setProcedureParameters_(b, c)
    },
    renameVar: function(a, b) {
        for (var c = 0; c < this.arguments_.length; c++) Blockly.Names.equals(a, this.arguments_[c]) && (this.arguments_[c] = b, this.getField("ARGNAME" + c).setValue(b))
    },
    onchange: function(a) {
        if (this.workspace &&
            !this.workspace.isFlyout)
            if (a.type == Blockly.Events.CREATE && -1 != a.ids.indexOf(this.id)) {
                var b = this.getProcedureCall(),
                    b = Blockly.Procedures.getDefinition(b, this.workspace);
                !b || b.type == this.defType_ && JSON.stringify(b.arguments_) == JSON.stringify(this.arguments_) || (b = null);
                if (!b) {
                    Blockly.Events.setGroup(a.group);
                    a = goog.dom.createDom("xml");
                    b = goog.dom.createDom("block");
                    b.setAttribute("type", this.defType_);
                    var c = this.getRelativeToSurfaceXY(),
                        e = c.y + 2 * Blockly.SNAP_RADIUS;
                    b.setAttribute("x", c.x + Blockly.SNAP_RADIUS *
                        (this.RTL ? -1 : 1));
                    b.setAttribute("y", e);
                    c = this.mutationToDom();
                    b.appendChild(c);
                    c = goog.dom.createDom("field");
                    c.setAttribute("name", "NAME");
                    c.appendChild(document.createTextNode(this.getProcedureCall()));
                    b.appendChild(c);
                    a.appendChild(b);
                    Blockly.Xml.domToWorkspace(a, this.workspace);
                    Blockly.Events.setGroup(!1)
                }
            } else a.type == Blockly.Events.DELETE && (b = this.getProcedureCall(), b = Blockly.Procedures.getDefinition(b, this.workspace), b || (Blockly.Events.setGroup(a.group), this.dispose(!0, !1), Blockly.Events.setGroup(!1)))
    },
    customContextMenu: function(a) {
        var b = {
            enabled: !0
        };
        b.text = Blockly.Msg.PROCEDURES_HIGHLIGHT_DEF;
        var c = this.getProcedureCall(),
            e = this.workspace;
        b.callback = function() {
            var a = Blockly.Procedures.getDefinition(c, e);
            a && a.select()
        };
        a.push(b)
    },
    defType_: "procedures_defnoreturn"
};
Blockly.Blocks.procedures_callreturn = {
    init: function() {
        this.appendDummyInput("TOPROW").appendField("", "NAME");
        this.setOutput(!0);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_CALLRETURN_HELPURL);
        this.arguments_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null
    },
    getProcedureCall: Blockly.Blocks.procedures_callnoreturn.getProcedureCall,
    renameProcedure: Blockly.Blocks.procedures_callnoreturn.renameProcedure,
    setProcedureParameters_: Blockly.Blocks.procedures_callnoreturn.setProcedureParameters_,
    updateShape_: Blockly.Blocks.procedures_callnoreturn.updateShape_,
    mutationToDom: Blockly.Blocks.procedures_callnoreturn.mutationToDom,
    domToMutation: Blockly.Blocks.procedures_callnoreturn.domToMutation,
    renameVar: Blockly.Blocks.procedures_callnoreturn.renameVar,
    onchange: Blockly.Blocks.procedures_callnoreturn.onchange,
    customContextMenu: Blockly.Blocks.procedures_callnoreturn.customContextMenu,
    defType_: "procedures_defreturn"
};
Blockly.Blocks.procedures_ifreturn = {
    init: function() {
        this.appendValueInput("CONDITION").setCheck("Boolean").appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN);
        this.setInputsInline(!0);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setColour(Blockly.Blocks.procedures.HUE);
        this.setTooltip(Blockly.Msg.PROCEDURES_IFRETURN_TOOLTIP);
        this.setHelpUrl(Blockly.Msg.PROCEDURES_IFRETURN_HELPURL);
        this.hasReturnValue_ = !0
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("value", Number(this.hasReturnValue_));
        return a
    },
    domToMutation: function(a) {
        this.hasReturnValue_ = 1 == a.getAttribute("value");
        this.hasReturnValue_ || (this.removeInput("VALUE"), this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN))
    },
    onchange: function(a) {
        a = !1;
        var b = this;
        do {
            if (-1 != this.FUNCTION_TYPES.indexOf(b.type)) {
                a = !0;
                break
            }
            b = b.getSurroundParent()
        } while (b);
        a ? ("procedures_defnoreturn" == b.type &&
            this.hasReturnValue_ ? (this.removeInput("VALUE"), this.appendDummyInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN), this.hasReturnValue_ = !1) : "procedures_defreturn" != b.type || this.hasReturnValue_ || (this.removeInput("VALUE"), this.appendValueInput("VALUE").appendField(Blockly.Msg.PROCEDURES_DEFRETURN_RETURN), this.hasReturnValue_ = !0), this.setWarningText(null)) : this.setWarningText(Blockly.Msg.PROCEDURES_IFRETURN_WARNING)
    },
    FUNCTION_TYPES: ["procedures_defnoreturn", "procedures_defreturn"]
};
Blockly.Blocks.texts = {};
Blockly.Blocks.texts.HUE = 160;
Blockly.Blocks.text = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "TEXT").appendField(this.newQuote_(!1));
        this.setOutput(!0, "String");
        var a = this;
        this.setTooltip(function() {
            var b = a.getParent();
            return b && b.getInputsInline() && b.tooltip || Blockly.Msg.TEXT_TEXT_TOOLTIP
        })
    },
    newQuote_: function(a) {
        return new Blockly.FieldImage(a == this.RTL ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==" :
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC", 12, 12, '"')
    }
};
Blockly.Blocks.text_join = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.itemCount_ = 2;
        this.updateShape_();
        this.setOutput(!0, "String");
        this.setMutator(new Blockly.Mutator(["text_create_join_item"]));
        this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP)
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("items", this.itemCount_);
        return a
    },
    domToMutation: function(a) {
        this.itemCount_ = parseInt(a.getAttribute("items"), 10);
        this.updateShape_()
    },
    decompose: function(a) {
        var b = a.newBlock("text_create_join_container");
        b.initSvg();
        for (var c = b.getInput("STACK").connection, e = 0; e < this.itemCount_; e++) {
            var d = a.newBlock("text_create_join_item");
            d.initSvg();
            c.connect(d.previousConnection);
            c = d.nextConnection
        }
        return b
    },
    compose: function(a) {
        var b = a.getInputTargetBlock("STACK");
        for (a = []; b;) a.push(b.valueConnection_), b = b.nextConnection && b.nextConnection.targetBlock();
        for (b = 0; b < this.itemCount_; b++) {
            var c = this.getInput("ADD" + b).connection.targetConnection;
            c && -1 == a.indexOf(c) && c.disconnect()
        }
        this.itemCount_ = a.length;
        this.updateShape_();
        for (b = 0; b < this.itemCount_; b++) Blockly.Mutator.reconnect(a[b], this, "ADD" + b)
    },
    saveConnections: function(a) {
        a = a.getInputTargetBlock("STACK");
        for (var b = 0; a;) {
            var c = this.getInput("ADD" + b);
            a.valueConnection_ = c && c.connection.targetConnection;
            b++;
            a = a.nextConnection && a.nextConnection.targetBlock()
        }
    },
    updateShape_: function() {
        this.itemCount_ && this.getInput("EMPTY") ? this.removeInput("EMPTY") : this.itemCount_ || this.getInput("EMPTY") ||
            this.appendDummyInput("EMPTY").appendField(this.newQuote_(!0)).appendField(this.newQuote_(!1));
        for (var a = 0; a < this.itemCount_; a++)
            if (!this.getInput("ADD" + a)) {
                var b = this.appendValueInput("ADD" + a);
                0 == a && b.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH)
            }
        for (; this.getInput("ADD" + a);) this.removeInput("ADD" + a), a++
    },
    newQuote_: Blockly.Blocks.text.newQuote_
};
Blockly.Blocks.text_create_join_container = {
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_TITLE_JOIN);
        this.appendStatementInput("STACK");
        this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.text_create_join_item = {
    init: function() {
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP);
        this.contextMenu = !1
    }
};
Blockly.Blocks.text_append = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT").appendField(Blockly.Msg.TEXT_APPEND_TO).appendField(new Blockly.FieldVariable(Blockly.Msg.TEXT_APPEND_VARIABLE), "VAR").appendField(Blockly.Msg.TEXT_APPEND_APPENDTEXT);
        this.setPreviousStatement(!0);
        this.setNextStatement(!0);
        var a = this;
        this.setTooltip(function() {
            return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace("%1", a.getFieldValue("VAR"))
        })
    }
};
Blockly.Blocks.text_length = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_LENGTH_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
                check: ["String", "Array"]
            }],
            output: "Number",
            colour: Blockly.Blocks.texts.HUE,
            tooltip: Blockly.Msg.TEXT_LENGTH_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_LENGTH_HELPURL
        })
    }
};
Blockly.Blocks.text_isEmpty = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_ISEMPTY_TITLE,
            args0: [{
                type: "input_value",
                name: "VALUE",
                check: ["String", "Array"]
            }],
            output: "Boolean",
            colour: Blockly.Blocks.texts.HUE,
            tooltip: Blockly.Msg.TEXT_ISEMPTY_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_ISEMPTY_HELPURL
        })
    }
};
Blockly.Blocks.text_indexOf = {
    init: function() {
        var a = [
            [Blockly.Msg.TEXT_INDEXOF_OPERATOR_FIRST, "FIRST"],
            [Blockly.Msg.TEXT_INDEXOF_OPERATOR_LAST, "LAST"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_INDEXOF_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.setOutput(!0, "Number");
        this.appendValueInput("VALUE").setCheck("String").appendField(Blockly.Msg.TEXT_INDEXOF_INPUT_INTEXT);
        this.appendValueInput("FIND").setCheck("String").appendField(new Blockly.FieldDropdown(a), "END");
        Blockly.Msg.TEXT_INDEXOF_TAIL && this.appendDummyInput().appendField(Blockly.Msg.TEXT_INDEXOF_TAIL);
        this.setInputsInline(!0);
        var b = this;
        this.setTooltip(function() {
            return Blockly.Msg.TEXT_INDEXOF_TOOLTIP.replace("%1", b.workspace.options.oneBasedIndex ? "0" : "-1")
        })
    }
};
Blockly.Blocks.text_charAt = {
    init: function() {
        this.WHERE_OPTIONS = [
            [Blockly.Msg.TEXT_CHARAT_FROM_START, "FROM_START"],
            [Blockly.Msg.TEXT_CHARAT_FROM_END, "FROM_END"],
            [Blockly.Msg.TEXT_CHARAT_FIRST, "FIRST"],
            [Blockly.Msg.TEXT_CHARAT_LAST, "LAST"],
            [Blockly.Msg.TEXT_CHARAT_RANDOM, "RANDOM"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_CHARAT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.setOutput(!0, "String");
        this.appendValueInput("VALUE").setCheck("String").appendField(Blockly.Msg.TEXT_CHARAT_INPUT_INTEXT);
        this.appendDummyInput("AT");
        this.setInputsInline(!0);
        this.updateAt_(!0);
        var a = this;
        this.setTooltip(function() {
            var b = a.getFieldValue("WHERE"),
                c = Blockly.Msg.TEXT_CHARAT_TOOLTIP;
            if ("FROM_START" == b || "FROM_END" == b) c += "  " + ("FROM_START" == b ? Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP : Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP).replace("%1", a.workspace.options.oneBasedIndex ? "#1" : "#0");
            return c
        })
    },
    mutationToDom: function() {
        var a = document.createElement("mutation"),
            b = this.getInput("AT").type == Blockly.INPUT_VALUE;
        a.setAttribute("at", b);
        return a
    },
    domToMutation: function(a) {
        a = "false" != a.getAttribute("at");
        this.updateAt_(a)
    },
    updateAt_: function(a) {
        this.removeInput("AT");
        this.removeInput("ORDINAL", !0);
        a ? (this.appendValueInput("AT").setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL").appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) : this.appendDummyInput("AT");
        Blockly.Msg.TEXT_CHARAT_TAIL && (this.removeInput("TAIL", !0), this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_CHARAT_TAIL));
        var b = new Blockly.FieldDropdown(this.WHERE_OPTIONS,
            function(b) {
                var e = "FROM_START" == b || "FROM_END" == b;
                if (e != a) {
                    var d = this.sourceBlock_;
                    d.updateAt_(e);
                    d.setFieldValue(b, "WHERE");
                    return null
                }
            });
        this.getInput("AT").appendField(b, "WHERE")
    }
};
Blockly.Blocks.text_getSubstring = {
    init: function() {
        this.WHERE_OPTIONS_1 = [
            [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, "FROM_START"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, "FROM_END"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, "FIRST"]
        ];
        this.WHERE_OPTIONS_2 = [
            [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, "FROM_START"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, "FROM_END"],
            [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, "LAST"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("STRING").setCheck("String").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
        this.appendDummyInput("AT1");
        this.appendDummyInput("AT2");
        Blockly.Msg.TEXT_GET_SUBSTRING_TAIL && this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
        this.setInputsInline(!0);
        this.setOutput(!0, "String");
        this.updateAt_(1, !0);
        this.updateAt_(2, !0);
        this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP)
    },
    mutationToDom: function() {
        var a = document.createElement("mutation"),
            b = this.getInput("AT1").type == Blockly.INPUT_VALUE;
        a.setAttribute("at1", b);
        b = this.getInput("AT2").type == Blockly.INPUT_VALUE;
        a.setAttribute("at2", b);
        return a
    },
    domToMutation: function(a) {
        var b = "true" == a.getAttribute("at1");
        a = "true" == a.getAttribute("at2");
        this.updateAt_(1, b);
        this.updateAt_(2, a)
    },
    updateAt_: function(a, b) {
        this.removeInput("AT" + a);
        this.removeInput("ORDINAL" + a, !0);
        b ? (this.appendValueInput("AT" + a).setCheck("Number"), Blockly.Msg.ORDINAL_NUMBER_SUFFIX && this.appendDummyInput("ORDINAL" + a).appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX)) :
            this.appendDummyInput("AT" + a);
        2 == a && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL && (this.removeInput("TAIL", !0), this.appendDummyInput("TAIL").appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL));
        var c = new Blockly.FieldDropdown(this["WHERE_OPTIONS_" + a], function(c) {
            var d = "FROM_START" == c || "FROM_END" == c;
            if (d != b) {
                var f = this.sourceBlock_;
                f.updateAt_(a, d);
                f.setFieldValue(c, "WHERE" + a);
                return null
            }
        });
        this.getInput("AT" + a).appendField(c, "WHERE" + a);
        1 == a && this.moveInputBefore("AT1", "AT2")
    }
};
Blockly.Blocks.text_changeCase = {
    init: function() {
        var a = [
            [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE, "UPPERCASE"],
            [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE, "LOWERCASE"],
            [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE, "TITLECASE"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT").setCheck("String").appendField(new Blockly.FieldDropdown(a), "CASE");
        this.setOutput(!0, "String");
        this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP)
    }
};
Blockly.Blocks.text_trim = {
    init: function() {
        var a = [
            [Blockly.Msg.TEXT_TRIM_OPERATOR_BOTH, "BOTH"],
            [Blockly.Msg.TEXT_TRIM_OPERATOR_LEFT, "LEFT"],
            [Blockly.Msg.TEXT_TRIM_OPERATOR_RIGHT, "RIGHT"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_TRIM_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        this.appendValueInput("TEXT").setCheck("String").appendField(new Blockly.FieldDropdown(a), "MODE");
        this.setOutput(!0, "String");
        this.setTooltip(Blockly.Msg.TEXT_TRIM_TOOLTIP)
    }
};
Blockly.Blocks.text_print = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.TEXT_PRINT_TITLE,
            args0: [{
                type: "input_value",
                name: "TEXT"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.texts.HUE,
            tooltip: Blockly.Msg.TEXT_PRINT_TOOLTIP,
            helpUrl: Blockly.Msg.TEXT_PRINT_HELPURL
        })
    }
};
Blockly.Blocks.text_prompt_ext = {
    init: function() {
        var a = [
            [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, "TEXT"],
            [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, "NUMBER"]
        ];
        this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        var b = this,
            a = new Blockly.FieldDropdown(a, function(a) {
                b.updateType_(a)
            });
        this.appendValueInput("TEXT").appendField(a, "TYPE");
        this.setOutput(!0, "String");
        this.setTooltip(function() {
            return "TEXT" == b.getFieldValue("TYPE") ? Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT : Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER
        })
    },
    updateType_: function(a) {
        this.outputConnection.setCheck("NUMBER" == a ? "Number" : "String")
    },
    mutationToDom: function() {
        var a = document.createElement("mutation");
        a.setAttribute("type", this.getFieldValue("TYPE"));
        return a
    },
    domToMutation: function(a) {
        this.updateType_(a.getAttribute("type"))
    }
};
Blockly.Blocks.text_prompt = {
    init: function() {
        var a = [
                [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, "TEXT"],
                [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, "NUMBER"]
            ],
            b = this;
        this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
        this.setColour(Blockly.Blocks.texts.HUE);
        a = new Blockly.FieldDropdown(a, function(a) {
            b.updateType_(a)
        });
        this.appendDummyInput().appendField(a, "TYPE").appendField(this.newQuote_(!0)).appendField(new Blockly.FieldTextInput(""), "TEXT").appendField(this.newQuote_(!1));
        this.setOutput(!0, "String");
        this.setTooltip(function() {
            return "TEXT" ==
                b.getFieldValue("TYPE") ? Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT : Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER
        })
    },
    newQuote_: Blockly.Blocks.text.newQuote_,
    updateType_: Blockly.Blocks.text_prompt_ext.updateType_,
    mutationToDom: Blockly.Blocks.text_prompt_ext.mutationToDom,
    domToMutation: Blockly.Blocks.text_prompt_ext.domToMutation
};
Blockly.Blocks.variables = {};
Blockly.Blocks.variables.HUE = 330;
Blockly.Blocks.variables_get = {
    init: function() {
        this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
        this.setColour(Blockly.Blocks.variables.HUE);
        this.appendDummyInput().appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
        this.setOutput(!0);
        this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_GET_CREATE_SET
    },
    contextMenuType_: "variables_set",
    customContextMenu: function(a) {
        var b = {
                enabled: !0
            },
            c = this.getFieldValue("VAR");
        b.text = this.contextMenuMsg_.replace("%1",
            c);
        c = goog.dom.createDom("field", null, c);
        c.setAttribute("name", "VAR");
        c = goog.dom.createDom("block", null, c);
        c.setAttribute("type", this.contextMenuType_);
        b.callback = Blockly.ContextMenu.callbackFactory(this, c);
        a.push(b)
    }
};
Blockly.Blocks.variables_set = {
    init: function() {
        this.jsonInit({
            message0: Blockly.Msg.VARIABLES_SET,
            args0: [{
                type: "field_variable",
                name: "VAR",
                variable: Blockly.Msg.VARIABLES_DEFAULT_NAME
            }, {
                type: "input_value",
                name: "VALUE"
            }],
            previousStatement: null,
            nextStatement: null,
            colour: Blockly.Blocks.variables.HUE,
            tooltip: Blockly.Msg.VARIABLES_SET_TOOLTIP,
            helpUrl: Blockly.Msg.VARIABLES_SET_HELPURL
        });
        this.contextMenuMsg_ = Blockly.Msg.VARIABLES_SET_CREATE_GET
    },
    contextMenuType_: "variables_get",
    customContextMenu: Blockly.Blocks.variables_get.customContextMenu
};