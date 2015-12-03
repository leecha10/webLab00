"use strict";

document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */

	 $$("#labs img").each(function(img) {
			 new Draggable(img, {revert: true});
	 });

	 Droppables.add("selectpad", {
		 onDrop: labSelect
	 });

	 Droppables.add("labs", {
		 onDrop: labSelect
	 });

});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function
	 * 이 event-handler function을 작성하시오.
	 */

	 if (drag.parentNode.id != drop.id) {
		 // adding to selectpad
		if (drop.id == "selectpad") {
			if (drop.childNodes.length < 3) {
				drag.parentNode.removeChild(drag);
				drop.appendChild(drag);

				// 0.5 second after the list item is created and added, it should pulsate for 1.0 second
				$("selection").pulsate({
					delay: 0.5,
					duration: 1.0,
					beforeSetup: function(){
						var li = document.createElement("li");
						li.innerHTML = drag.alt;
						$("selection").appendChild(li);
					}
				});
			}
		}

		// delete from selectpad (drop.id = labs)
		else {
			var icon = drag.alt;

			//alert($("selection").childNodes[0].innerHTML);

			for (var i=0; i<$("selection").childNodes.length; i++) {
				var html = $("selection").childNodes[i].innerHTML;
				if (icon == html) {
						$("selection").removeChild($("selection").childNodes[i]);
				}
			}
			drag.parentNode.removeChild(drag);
			drop.appendChild(drag);
		}
	}
}
