<modal id="create-series">
    <h3>Create Series</h3>
    <label>Series Name</label><br>
    <input type="text" name="series-name" /><br>
    <button onclick="createSeries(this.previousElementSibling);">Create Series</button>
    <button onclick="hideModal('create-series');">Cancel</button>
</modal>
<select class="series-dropdown" name="<?=$this->component_args["name"];?>">
    <?php
        $series = SeriesModel::getAllSeries();
        foreach ($series as $s) { ?>
            <option value="<?=$s->id;?>"><?=$s->name;?></option>
    <?php } ?>
    <option value="-1">None</option>
</select>
<button class="series-new-button" onclick="onCreateSeries();">New Series</button>
<button class="series-delete-button" onclick="onDeleteSeries(this.previousElementSibling.previousElementSibling);"><i class="fas fa-trash-alt"></i></button>
<br>
<script>
    if (onCreateSeries === undefined) {
        function onCreateSeries() {
            event.preventDefault();
            showModal("create-series");
        }
    }
    if (onDeleteSeries === undefined) {
        function onDeleteSeries(e) {
            event.preventDefault();
            let id = e.options[e.selectedIndex].value;
            let text = e.options[e.selectedIndex].text;
            showPrompt("Are you sure you wish to delete '" + text + "'", () => {
                ajaxGET("/series/delete?id=" + encodeURIComponent(id), (r) => {
                    let response = JSON.parse(r.responseText);
                    if (response.result) {
                        e.remove(e.querySelector('option[value="' + id + '"]').index);
                    }
                });
            });
        }
    }
    if (createSeries === undefined) {
        function createSeries(e) {
            let name = e.value;
            ajaxGET("/series/create?name=" + encodeURIComponent(name), (r) => {
                let newSeries = JSON.parse(r.responseText);
                Array.from(document.getElementsByClassName("series-dropdown")).forEach(d => {
                    let option = document.createElement("option");
                    option.value = newSeries.id;
                    option.innerText = newSeries.name;
                    d.insertBefore(option, d.lastElementChild);

                });
            });
        }
    }
</script>