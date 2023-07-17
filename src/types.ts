export interface FlashcardType {
  id: string | number;
  frontImageUrl?: string;
  frontText?: string;
  backText?: string;
}

export interface PadletPostType {
  id: string;
  attributes: {
    content: {
      attachment?: {
        url: string;
      };
      subject?: string;
      bodyHtml?: string;
    };
  };
  relationships: {
    attachmentData?: {
      links?: {
        related: string;
      };
    };
  };
  resolvedAttachmentData?: PadletPostAttachmentDataType["attributes"];
}

export interface PadletPostAttachmentDataType {
  id: string;
  attributes: {
    previewImageUrl: string;
    embedCode: string;
  };
}
