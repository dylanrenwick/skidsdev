const gameData = {
	game: {
		screen: null,
		ctx: null,
	},
	userData: {},
	buildings,
};

function init() {
    gameData.game.screen = document.getElementById("gameScreen");
    if (gameData.game.screen === undefined) {
        throw new Error("Could not get game screen");
    }

	gameData.game.ctx = gameData.game.screen.getContext("2d");
	if (gameData.game.ctx === undefined) {
		throw new Error("Could not get game screen render context");
	}
	
    if (!load())
	{
		gameData.userData = defaultUserData;
		save();
	}

	createGame();

	let render = () => {
		gameData.game.rootNode.render(
			gameData.game.ctx,
			gameData.game.canvasRect
		);
		gameData.game.renderId = requestAnimationFrame(render);
	};
	gameData.game.renderId = requestAnimationFrame(render);
}

window.addEventListener("load", init);

function createGame() {
	gameData.game.canvasRect = new Rectangle(new Point(0, 0), new Point(gameData.game.screen.width, gameData.game.screen.height));

	gameData.game.rootNode = new SplitPanelRenderNode("root",
		new SplitPanelRenderNode("left_center",
			new RenderNode("side_bar", [], new RenderStyle().with(s => s.fillStyle = "#222")),
			new SplitPanelRenderNode("center",
				new RenderNode("center_pane"),
				new ButtonRenderNode("bigButton",
					new RenderStyle().with(s => {
						s.fillStyle = "#222";
						s.hoverStyle = "#777";
						s.strokeStyle = "#111";
						s.lineWidth = 2;
						s.borderRadius = 10;
					})
				),
				SplitPanelRenderNode.SPLIT_HORIZONTAL, 0.8,
				new RenderStyle().with(s => {
					s.fillStyle = "#555";
					s.padding = 15;
				})
			),
			SplitPanelRenderNode.SPLIT_VERTICAL, 0.08
		),
		new RenderNode("right", [], new RenderStyle().with(s => s.fillStyle = "#444")),
		SplitPanelRenderNode.SPLIT_VERTICAL, 0.75
	);

	gameData.game.screen.addEventListener("mousemove", e => {
		let evnt = new NodeMouseEvent(e, gameData.game.prevMouseEvent);
		gameData.game.prevMouseEvent = evnt;
		gameData.game.rootNode.onMouseMove(evnt, gameData.game.canvasRect);
	});
}

