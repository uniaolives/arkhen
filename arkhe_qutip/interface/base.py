
class Context:
    def __init__(self, inputs):
        self._inputs = inputs
    def input(self, key, default=None): # Updated signature
        return self._inputs.get(key, default)
    async def call_skill(self, skill_id, params):
        return {"status": "success"}

class Skill:
    skill_id: str
    capabilities: list
    async def execute(self, ctx: Context) -> dict:
        raise NotImplementedError
