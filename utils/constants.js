import { createThirdwebClient ,defineChain} from "thirdweb"

const CLIENT_ID="43d05e641f828c1f61261ae42f079e12"

export const client=createThirdwebClient=({
    clientId:CLIENT_ID
})

export const chain=defineChain(11155111)