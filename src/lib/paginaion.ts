export async function pagination(element, onLoadMore) {
	element.addEventListener("scroll", async () => {
		if (element.scrollHeight - element.scrollTop - element.clientHeight < 20) {
			onLoadMore();
		}
	});
}
