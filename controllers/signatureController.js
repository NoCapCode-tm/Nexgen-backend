import Signature from "../models/Signature.js";
import Signer from "../models/Signer.js";
import { Document } from "../models/Document.js";

export const createSignature = async (req, res) => {
  try {
    const {
      documentId,
      signerId,
      page,
      x,
      y,
      width,
      height,
      signatureImageUrl,
    } = req.body;

    // 1. validate required fields
    if (!documentId || !signerId || !signatureImageUrl) {
      return res.status(400).json({
        message: "documentId, signerId and signatureImageUrl are required",
      });
    }

    // 2. check document
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // 3. check signer
    const signer = await Signer.findById(signerId);

    if (!signer || signer.document.toString() !== documentId) {
      return res.status(400).json({
        message: "Invalid signer",
      });
    }

    // 4. prevent duplicate signing
    if (signer.status === "signed") {
      return res.status(400).json({
        message: "Signer already signed",
      });
    }

    // 5. save signature
    const signature = await Signature.create({
      document: documentId,
      signer: signerId,
      page,
      x,
      y,
      width,
      height,
      signatureImageUrl,
    });

    // 6. update signer status
    signer.status = "signed";
    await signer.save();

    // 7. check if all signers signed
    const remaining = await Signer.countDocuments({
      document: documentId,
      status: "pending",
    });

    if (remaining === 0) {
      document.status = "completed";
      await document.save();
    }

    res.status(201).json({
      success: true,
      message: "Signature saved",
      signature,
      documentStatus: document.status,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
