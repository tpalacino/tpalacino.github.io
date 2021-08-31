self.addEventListener("install", installEvent => {
  installEvent.waitUntil(() => {
    console.log("app installed.")
  })
})