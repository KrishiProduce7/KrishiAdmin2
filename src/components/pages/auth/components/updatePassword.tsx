"use client"

import { useForm } from "@refinedev/react-hook-form";
import * as React from "react";
import {
  type UpdatePasswordFormTypes,
  type UpdatePasswordPageProps,
  useActiveAuthProvider,
  type BaseRecord,
  type HttpError,
  useTranslate,
  useLink,
  useRouterContext,
  useRouterType,
  useUpdatePassword,
} from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";
import { layoutStyles, titleStyles } from "./styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import type { BoxProps } from "@mui/material/Box";
import type { CardContentProps } from "@mui/material/CardContent";
import type { FormPropsType } from "../index";

type UpdatePasswordProps = UpdatePasswordPageProps<
  BoxProps,
  CardContentProps,
  FormPropsType
>;

interface UpdatePasswordWithCodeFormTypes extends UpdatePasswordFormTypes {
  resetCode: string;
}

/**
 * The updatePassword type is the page used to update the password of the user.
 * @see {@link https://refine.dev/docs/api-reference/mui/components/mui-auth-page/#update-password} for more details.
 */
export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
  wrapperProps,
  contentProps,
  renderContent,
  formProps,
  title = undefined,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, UpdatePasswordWithCodeFormTypes>({
    ...useFormProps as any,
  });
  
  const authProvider = useActiveAuthProvider();
  const { mutate: update, isLoading } =
    useUpdatePassword<UpdatePasswordWithCodeFormTypes>({
      v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const translate = useTranslate();

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        {title ?? (
          <ThemedTitleV2
            collapsed={false}
            wrapperStyles={{
              gap: "8px",
            }}
          />
        )}
      </div>
    );

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={titleStyles}
          color="primary"
          fontWeight={700}
        >
          {translate("pages.updatePassword.title", "Set New Password")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => {
            if (onSubmit) {
              return onSubmit(data);
            }

            return update(data as UpdatePasswordWithCodeFormTypes);
          })}
        >
          <TextField
            {...register("resetCode", {
              required: translate(
                "pages.updatePassword.errors.requiredCode",
                "Reset code required"
              ),
            })}
            id="resetCode"
            margin="normal"
            fullWidth
            name="resetCode"
            label={translate(
              "pages.updatePassword.fields.resetCode",
              "Reset Code"
            )}
            helperText={errors?.resetCode?.message}
            error={!!errors?.resetCode}
            type="string"
            placeholder="123456"
            sx={{
              mb: "24px",
            }}
          /> 

          <TextField
            {...register("password", {
              required: translate(
                "pages.updatePassword.errors.requiredPassword",
                "Password required"
              ),
            })}
            id="password"
            margin="normal"
            fullWidth
            name="password"
            label={translate(
              "pages.updatePassword.fields.password",
              "New Password"
            )}
            helperText={errors?.password?.message}
            error={!!errors?.password}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-password"
            sx={{
              m: 0,
            }}
          />

          <TextField
            {...register("confirmPassword", {
              required: translate(
                "pages.updatePassword.errors.requiredConfirmPassword",
                "Confirm Password is required"
              ),
              validate: (value?: string) => {
                if (watch("password") !== value) {
                  return translate(
                    "pages.updatePassword.errors.confirmPasswordNotMatch",
                    "Passwords do not match"
                  );
                }
                return true;
              },
            })}
            id="confirmPassword"
            margin="normal"
            fullWidth
            name="confirmPassword"
            label={translate(
              "pages.updatePassword.fields.confirmPassword",
              "Confirm New Password"
            )}
            helperText={errors?.confirmPassword?.message}
            error={!!errors?.confirmPassword}
            type="password"
            placeholder="●●●●●●●●"
            autoComplete="current-confirm-password"
            sx={{
              mb: 0,
            }}
          />
          <MuiLink
            variant="body2"
            color="primary"
            fontSize="12px"
            component={ActiveLink}
            underline="none"
            to="/forgot-password"
          >
            {translate(
              "pages.login.buttons.forgotPassword",
              "Forgot password?"
            )}
          </MuiLink>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: "24px",
            }}
            disabled={isLoading}
          >
            {translate("pages.updatePassword.buttons.submit", "Update")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Box component="div" style={layoutStyles} {...(wrapperProps ?? {})}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "100dvh",
            padding: "16px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          {renderContent ? (
            renderContent(Content, PageTitle)
          ) : (
            <>
              {PageTitle}
              {Content}
            </>
          )}
        </Container>
      </Box>
    </>
  );
};
