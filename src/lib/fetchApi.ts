import { goto } from "$app/navigation";
import { getCookie } from "./cookie";
import { say } from "./normalFunction";

const API_HOST = import.meta.env.VITE_API_HOST;

export async function call(
	route: string,
	options: { method?: string; data?: any; withToken?: boolean } = { method: "GET", data: null, withToken: false }
) {
	try {
		const response = await fetch(`${API_HOST}${route}`, {
			method: options.method,
			headers: {
				"Content-Type": "application/json",
				Authorization: options.withToken ? `Bearer ${getCookie("token")}` : null,
			},
			body: options.data ? JSON.stringify(options.data) : null,
		});

		console.log(route);

		const contentType = response.headers.get("content-type");
		if (contentType && contentType.indexOf("application/json") !== -1) {
			const responseData = await response.json();

			if (responseData.message == "User not found") {
				alert(
					say(
						"⚠️ เกิดข้อผิดพลาด\n\nไม่พบข้อมูลผู้ใช้ หรือ เซสชั่นหมดอายุ\n\nกรุณาเข้าสู่ระบบใหม่อีกครั้ง",
						"(*￣3￣)╭"
					)
				);
				goto("/login?clear");
				return;
			}

			console.log(response);

			if (responseData.message) {
				if (responseData.message.includes("Too Many Requests")) {
					alert(say("ใจเย็นๆหน่อย~\n\nคุณดูเหนื่อยๆนะดื่มน้ำหน่อยไหม", "♪(´▽｀)"));
					return;
				} else if (responseData.message.includes("Unauthorized")) {
					alert(say("กรุณาเข้าสู่ระบบก่อนใช้งาน", "( •̀ ω •́ )✧"));
					return;
				}
			}

			if (!response.ok) {
				alert(
					say(
						`${route}\n\n⚠️ เกิดข้อผิดพลาด\n\nโปรดติดต่อ CE63@KMITL\n\n${
							responseData.error ?? ""
						}\n${JSON.stringify(responseData.message)}`,
						"(┬┬﹏┬┬)"
					)
				);
				return;
			}

			console.log(responseData);

			return await responseData;
		} else {
			return await response.text();
		}
	} catch (error) {
		try {
			if (error.toString().includes("Failed to fetch")) {
				alert(
					say(
						"⚠️ เกิดข้อผิดพลาด\n\nไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ โปรดติดต่อ CE63@KMITL",
						"(˘･_･˘)"
					)
				);
			} else {
				alert(`${route}\n\n${error}`);
			}
		} catch (error) {}
		return null;
	}
}
