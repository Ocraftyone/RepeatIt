(function() {
    var repeatAction
    var canRotate

    Plugin.register("repeat_it", {
        title: "Repeat It",
        author: "Ocraftyone",
        icon: "content_copy",
        description: "Allows you to repeat shapes with a translation applied to each new object",
        version: "0.0.1",
        variant: "both",
        onload(){ 
            repeatAction = new Action("repeat_shape", {
                name: "Repeat shape",
                description: "Repeat shape",
                icon: "content_copy",
                click(event) {
                    var option_dialog = new Dialog({
                        id: "repeat_shape_dialog",
                        title: "Repeat shape",
                        icon: "content_copy",
                        form: {
                            repeat: {label: "Repeat", type: "number", value: 1},
                            possitionDiff : {label: "Position difference", type: "vector", value: [0, 0, 0]},
                            rotationDiff : {label: "Rotation difference", type: "vector", value: [0, 0, 0]},
                        },
                        onConfirm(formResult) {
                            this.hide()

                            var elementsToAdd = []
                            Undo.initEdit({elements: elementsToAdd, outliner: true, selection: true})
                            
                            Cube.selected.forEach(cube, i => {
                                for (var i = 0; i < formResult.repeat; i++) {
                                    var newCube = new Cube()
                                    newCube.addTo(elementsToAdd)
                                    newCube.moveVector(formResult.possitionDiff)
                                    if (canRotate) {
                                        newCube.rotation.forEach((rotation, i) => {
                                            newCube.rotation[i] = rotation + formResult.rotationDiff[i]
                                        })
                                    }
                                    newCube.init()
                                }
                            })
                            
                            Undo.finishEdit("Repeat shape")
                        }
                    })
                    option_dialog.show()
                }
            })
            MenuBar.addAction(repeatAction, "tools")
        },
        onunload() {
            repeatAction.delete()
        }
    });


})()