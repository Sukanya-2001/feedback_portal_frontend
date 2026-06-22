import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

interface CommonModalProps {
  open: boolean;
  title: string;
  description: string;
  actionButtonText?: string;
  cancelButtonText?: string;
  onAction?: () => void;
  onCancel: () => void;
  loading?: boolean;
  noCancelBtn?: boolean;
  htmlText?: boolean;
}

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  title,
  description,
  actionButtonText = "Confirm",
  cancelButtonText = "Cancel",
  onAction,
  onCancel,
  noCancelBtn = false,
  loading = false,
  htmlText = false,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {htmlText ? (
            <Box
              sx={{
                width: "100%",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                overflow: "hidden",

                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                },

                "& *": {
                  maxWidth: "100%",
                },
              }}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          ) : (
            description
          )}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        {!noCancelBtn && (
          <Button onClick={onCancel} variant="outlined" disabled={loading}>
            {cancelButtonText}
          </Button>
        )}

        {onAction && (
          <Button onClick={onAction} variant="contained" disabled={loading}>
            {actionButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CommonModal;
