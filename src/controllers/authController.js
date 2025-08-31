import { ethers } from 'ethers';
import { createVerifiableCredentialJwt } from 'did-jwt-vc';
import { contract } from '../config/blockchain.js';

// NOTA IMPORTANTE: La clave privada del emisor debe ser de una de las cuentas
// de Ganache y NO debe estar en código en un entorno de producción.
const issuerKey = new ethers.Wallet('0x13c4954647b9ba019806d859b238732f3652d5462790747f208d51c5c44c1ebf'); 
const issuerDid = `did:ethr:${issuerKey.address}`;

export const login = async (req, res) => {
  const { walletAddress } = req.body;

  try {
    // 1. Obtener el DID del usuario de la blockchain a través de nuestro contrato
    const userDid = await contract.getDID(walletAddress);

    if (!userDid) {
      return res.status(404).send('DID not found for this address.');
    }

    // 2. Crear la credencial verificable (VC)
    const vcPayload = {
      sub: userDid, // El DID del usuario es el "sujeto" de la credencial
      vc: {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        type: ["VerifiableCredential", "IdentityCredential"],
        credentialSubject: {
          walletAddress: walletAddress,
          did: userDid,
        }
      }
    };

    // 3. Firmar la credencial con la clave del emisor (tu API)
    const vcJwt = await createVerifiableCredentialJwt(vcPayload, {
      signer: issuerKey.signingKey.sign,
      resolver: new didEthr.Resolver({ provider }),
    });

    // 4. Enviar la credencial verificable al usuario
    res.status(200).json({ token: vcJwt });
  } catch (error) {
    res.status(500).send('Error during login.');
  }
};