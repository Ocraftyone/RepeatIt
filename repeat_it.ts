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
                        form: {
                            repeat: {label: "Repeat", type: "number", value: 1},
                            possitionDiff : {label: "Position difference", type: "vector", value: [0, 0, 0]},
                            rotationDiff : {label: "Rotation difference", type: "vector", value: [0, 0, 0]},
                        },
                        onConfirm(formResult) {
                            this.hide()

                            var elementsToAdd: Cube[] = []
                            Undo.initEdit({elements: elementsToAdd, outliner: true, selection: true})
                            
                            Cube.selected.forEach((cube, i) => {
                                for (var j = 0; j < formResult.repeat; j++) {
                                    var newCubeFrom: ArrayVector3 = [cube.from[0] + (formResult.possitionDiff[0] * j), cube.from[1] + (formResult.possitionDiff[1] * j), cube.from[2] + (formResult.possitionDiff[2] * j)]
                                    var newCubeTo: ArrayVector3 = [cube.to[0] + (formResult.possitionDiff[0] * j), cube.to[1] + (formResult.possitionDiff[1] * j), cube.to[2] + (formResult.possitionDiff[2] * j)]
                                    if(canRotate) {
                                        var newCubeRotation: ArrayVector3 = [cube.rotation[0] + (formResult.rotationDiff[0] * j), cube.rotation[1] + (formResult.rotationDiff[1] * j), cube.rotation[2] + (formResult.rotationDiff[2] * j)]
                                    }
                                    var newCube = new Cube({
                                        from: newCubeFrom,
                                        to: newCubeTo,
                                        rotation: cube.rotation,
                                        shade: cube.shade
                                    }).init()
                                    elementsToAdd.push(newCube)
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
    })
})()