import {
  layoutClassesMeta,
  dimensionClassesMeta,
  measurementClassesMeta,
  fontSizeClassesMeta,
  opacityClassesMeta,
  colorClassesMeta,
} from "./styles/CSSClasses.registry";

import { ColorClassesMeta } from "./core/ColorClasses.registry";
import { DimensionClassesMeta } from "./core/DimensionClasses.registry";
import { FontSizesClassesMeta } from "./core/FontSizesClasses.registry";
import { LayoutClassesMeta } from "./core/LayoutClasses.registry";
import { OpacityClassesMeta } from "./core/OpacityClasses.registry";
import { SizeClassesMeta } from "./core/SizeClasses.registry";
import { ColorTokensMeta } from "./core/ColorTokens.registry";
import { CSSVariablesMeta } from "./core/CSSVariables.registry";
import { MeasurementTokensMeta } from "./core/MeasurementTokens.registry";
import { SequenceTokensMeta } from "./core/SequenceTokens.registry";
import { TokensLibraryMeta } from "./core/TokensLibrary.registry";
import { IconsInstallationMeta } from "./guides/IconsInstallation.registry";
import { IconsMeta } from "./guides/Icons.registry";
import { TokensInstallationMeta } from "./guides/TokensInstallation.registry";
import { TokensMeta } from "./guides/Tokens.registry";
import { CoreInstallationMeta } from "./guides/CoreInstallation.registry";
import { CoreUsageMeta } from "./guides/CoreUsage.registry";

import { UseAccordionMeta } from "./hooks/UseAccordion.registry";
import { UseCheckboxMeta } from "./hooks/UseCheckbox.registry";
import { UseCollapsibleMeta } from "./hooks/UseCollapsible.registry";
import { UseDialogMeta } from "./hooks/UseDialog.registry";
import { UseDropdownMenuMeta } from "./hooks/UseDropdownMenu.registry";
import { UseFieldMeta } from "./hooks/UseField.registry";
import { UseSheetMeta } from "./hooks/UseSheet.registry";
import { UseSwitchMeta } from "./hooks/UseSwitch.registry";
import { UseTabsMeta } from "./hooks/UseTabs.registry";
import { UseToolbarMeta } from "./hooks/UseToolbar.registry";
import { UseMessageBubbleMeta } from "./hooks/UseMessageBubble.registry";
import { UseSelectMeta } from "./hooks/UseSelect.registry";
import { UseClickOutsideMeta } from "./hooks/UseClickOutside.registry";
import { UseGradientMeta } from "./hooks/UseGradient.registry";
import { UseFloatingPlacementMeta } from "./hooks/UseFloatingPlacement.registry";
import { UseSoundMeta } from "./hooks/UseSound.registry";
import { UseSpeechMeta } from "./hooks/UseSpeech.registry";
import { UseEventListenerMeta } from "./hooks/UseEventListener.registry";
import { UseKeyPressMeta } from "./hooks/UseKeyPress.registry";
import { UseDisabledScrollMeta } from "./hooks/UseDisabledScroll.registry";
import { UseIsMobileMeta } from "./hooks/UseIsMobile.registry";
import { UseTimerMeta } from "./hooks/UseTimer.registry";
import { UseSaveOnUnloadMeta } from "./hooks/UseSaveOnUnload.registry";
import { UsePerformanceMetricsMeta } from "./hooks/UsePerformanceMetrics.registry";
import { UseTimeBeforeInteractionMeta } from "./hooks/UseTimeBeforeInteraction.registry";
import { UseComponentsInteractionsMeta } from "./hooks/UseComponentsInteractions.registry";
import { UseABTestingMeta } from "./hooks/UseABTesting.registry";
import { UseBehaviorAnalyticsMeta } from "./hooks/UseBehaviorAnalytics.registry";
import { UseIndexedDBMeta } from "./hooks/UseIndexedDB.registry";
import { UseAppPropertiesMeta } from "./hooks/UseAppProperties.registry";
import { HooksUsageMeta } from "./guides/HooksUsage.registry";
import { HooksAPIReferenceMeta } from "./guides/HooksAPIReference.registry";

import { ColorModeProviderMeta } from "./providers/ColorModeProvider.registry";
import { ColorModeMeta } from "./providers/ColorMode.registry";
import { UseColorModeMeta } from "./providers/UseColorMode.registry";
import { ClientProviderMeta } from "./providers/ClientProvider.registry";

import { GenerateAlphaMeta } from "./core/GenerateAlpha.registry";
import { GenerateVariationMeta } from "./core/GenerateVariation.registry";
import { CalculateContrastScoreMeta } from "./core/CalculateContrastScore.registry";
import { ApplyColorLuminanceMeta } from "./core/ApplyColorLuminance.registry";
import { SetLuminanceToneMeta } from "./core/SetLuminanceTone.registry";
import { LuminanceAmountFormatterMeta } from "./core/LuminanceAmountFormatter.registry";
import { GetRelativeLuminanceMeta } from "./core/GetRelativeLuminance.registry";
import { MeasurementRatiosMeta } from "./core/MeasurementRatios.registry";
import { GenerateModularScalesMeta } from "./core/GenerateModularScales.registry";
import { GenerateSequencesMeta } from "./core/GenerateSequences.registry";
import { GetContrastRatioMeta } from "./core/GetContrastRatio.registry";
import { CalculateStackOrderMeta } from "./core/CalculateStackOrder.registry";
import { GetSequenceUsagesMeta } from "./core/GetSequenceUsages.registry";
import { GenerateSequenceVariationMeta } from "./core/GenerateSequenceVariation.registry";
import { GenerateTokensFromTemplateMeta } from "./core/GenerateTokensFromTemplate.registry";
import { PXToREMMeta } from "./core/PXToREM.registry";
import { PXToPTMeta } from "./core/PXToPT.registry";
import { HEXToRGBMeta } from "./core/HEXToRGB.registry";
import { RGBAToHEXMeta } from "./core/RGBAToHEX.registry";
import { RGBToHSLMeta } from "./core/RGBToHSL.registry";
import { HEXToHSLMeta } from "./core/HEXToHSL.registry";

import { StylesInstallationMeta } from "./guides/StylesInstallation.registry";
import { StylesUsageMeta } from "./guides/StylesUsage.registry";
import { ComponentsInstallationMeta } from "./guides/ComponentsInstallation.registry";
import { ComponentsUsageMeta } from "./guides/ComponentsUsage.registry";
import { AnalyticsInstallationMeta } from "./guides/AnalyticsInstallation.registry";
import { AnalyticsUsageMeta } from "./guides/AnalyticsUsage.registry";

import { AccordionMeta } from "./components/Accordion.registry";
import { AvatarMeta } from "./components/Avatar.registry";
import { BadgeMeta } from "./components/Badge.registry";
import { BannerMeta } from "./components/Banner.registry";
import { BreadcrumbMeta } from "./components/Breadcrumb.registry";
import { ButtonMeta } from "./components/Button.registry";
import { CardMeta } from "./components/Card.registry";
import { CheckboxMeta } from "./components/Checkbox.registry";
import { CollapsibleMeta } from "./components/Collapsible.registry";
import { CopyButtonMeta } from "./components/CopyButton.registry";
import { DialogMeta } from "./components/Dialog.registry";
import { DividerMeta } from "./components/Divider.registry";
import { DropdownMeta } from "./components/Dropdown.registry";
import { FieldMeta } from "./components/Field.registry";
import { MarkMeta } from "./components/Mark.registry";
import { MessageBubbleMeta } from "./components/MessageBubble.registry";
import { OTPFieldMeta } from "./components/OTPField.registry";
import { OverlayMeta } from "./components/Overlay.registry";
import { PageMeta } from "./components/Page.registry";
import { PortalMeta } from "./components/Portal.registry";
import { ProgressBarMeta } from "./components/ProgressBar.registry";
import { ResizableMeta } from "./components/Resizable.registry";
import { RulerMeta } from "./components/Ruler.registry";
import { ScrollAreaMeta } from "./components/ScrollArea.registry";
import { SelectMeta } from "./components/Select.registry";
import { SheetMeta } from "./components/Sheet.registry";
import { ShimmerMeta } from "./components/Shimmer.registry";
import { SkeletonMeta } from "./components/Skeleton.registry";
import { SwitchMeta } from "./components/Switch.registry";
import { TableMeta } from "./components/Table.registry";
import { TabsMeta } from "./components/Tabs.registry";
import { TextareaMeta } from "./components/Textarea.registry";
import { ToggleMeta } from "./components/Toggle.registry";
import { ToolbarMeta } from "./components/Toolbar.registry";
import { TooltipMeta } from "./components/Tooltip.registry";
import { ActionSwapMeta } from "./components/ActionSwap.registry";
import { BulkActionsMeta } from "./components/BulkActions.registry";
import { ContextMenuMeta } from "./components/ContextMenu.registry";
import { DataTableMeta } from "./components/DataTable.registry";
import { DrawerMeta } from "./components/Drawer.registry";
import { LoaderMeta } from "./components/Loader.registry";
import { MorphingBoxMeta } from "./components/MorphingBox.registry";
import { PillMeta } from "./components/Pill.registry";
import { PromptMeta } from "./components/Prompt.registry";
import { ResponseStreamMeta } from "./components/ResponseStream.registry";
import { SharedLayoutMeta } from "./components/SharedLayout.registry";
import { TextCarrouselMeta } from "./components/TextCarrousel.registry";
import { TreeMeta } from "./components/Tree.registry";
import { ViewportMeta } from "./components/Viewport.registry";
import { VoiceControlMeta } from "./components/VoiceControl.registry";
import { WhiteboardMeta } from "./components/Whiteboard.registry";
import {
  IconMeta,
  WebIconMeta,
  PixelIconMeta,
  SocialIconMeta,
} from "./components/Icons.registry";

import type {
  ComponentRegistryMetadata,
  DocsGuideRegistryMetadata,
  GeneratorRegistryMetadata,
  HookRegistryMetadata,
  ProviderRegistryMetadata,
  StylingRegistryMetadata,
} from "@chambellan/contracts";

export const ComponentRegistry: ComponentRegistryMetadata[] = [
  AccordionMeta,
  AvatarMeta,
  BadgeMeta,
  BannerMeta,
  BreadcrumbMeta,
  ButtonMeta,
  CardMeta,
  CheckboxMeta,
  CollapsibleMeta,
  CopyButtonMeta,
  DialogMeta,
  DividerMeta,
  DropdownMeta,
  FieldMeta,
  MarkMeta,
  MessageBubbleMeta,
  OTPFieldMeta,
  OverlayMeta,
  PageMeta,
  PortalMeta,
  ProgressBarMeta,
  ResizableMeta,
  RulerMeta,
  ScrollAreaMeta,
  SelectMeta,
  SheetMeta,
  ShimmerMeta,
  SkeletonMeta,
  ActionSwapMeta,
  BulkActionsMeta,
  ContextMenuMeta,
  DataTableMeta,
  DrawerMeta,
  LoaderMeta,
  MorphingBoxMeta,
  PillMeta,
  PromptMeta,
  ResponseStreamMeta,
  SharedLayoutMeta,
  TextCarrouselMeta,
  TreeMeta,
  ViewportMeta,
  VoiceControlMeta,
  WhiteboardMeta,
  SwitchMeta,
  TableMeta,
  TabsMeta,
  TextareaMeta,
  ToggleMeta,
  ToolbarMeta,
  TooltipMeta,
  IconMeta,
  WebIconMeta,
  PixelIconMeta,
  SocialIconMeta,
];

export function getComponent(
  name: string,
): ComponentRegistryMetadata | undefined {
  return ComponentRegistry.find((meta) => meta.name === name);
}

export function hasComponent(name: string): boolean {
  return getComponent(name) !== undefined;
}

export const StylingRegistry: StylingRegistryMetadata[] = [
  layoutClassesMeta,
  dimensionClassesMeta,
  measurementClassesMeta,
  fontSizeClassesMeta,
  opacityClassesMeta,
  colorClassesMeta,
];

export function getStyling(name: string): StylingRegistryMetadata | undefined {
  return StylingRegistry.find((meta) => meta.name === name);
}

export const CoreGeneratorRegistry: GeneratorRegistryMetadata[] = [
  ColorClassesMeta,
  DimensionClassesMeta,
  FontSizesClassesMeta,
  LayoutClassesMeta,
  OpacityClassesMeta,
  SizeClassesMeta,
  ColorTokensMeta,
  CSSVariablesMeta,
  MeasurementTokensMeta,
  SequenceTokensMeta,
  TokensLibraryMeta,
  GenerateAlphaMeta,
  GenerateVariationMeta,
  CalculateContrastScoreMeta,
  ApplyColorLuminanceMeta,
  SetLuminanceToneMeta,
  LuminanceAmountFormatterMeta,
  GetRelativeLuminanceMeta,
  MeasurementRatiosMeta,
  GenerateModularScalesMeta,
  GenerateSequencesMeta,
  GetContrastRatioMeta,
  CalculateStackOrderMeta,
  GetSequenceUsagesMeta,
  GenerateSequenceVariationMeta,
  GenerateTokensFromTemplateMeta,
  PXToREMMeta,
  PXToPTMeta,
  HEXToRGBMeta,
  RGBAToHEXMeta,
  RGBToHSLMeta,
  HEXToHSLMeta,
];

export function getGenerator(
  name: string,
): GeneratorRegistryMetadata | undefined {
  return CoreGeneratorRegistry.find((meta) => meta.name === name);
}

export const HookRegistry: HookRegistryMetadata[] = [
  UseAccordionMeta,
  UseCheckboxMeta,
  UseCollapsibleMeta,
  UseDialogMeta,
  UseDropdownMenuMeta,
  UseFieldMeta,
  UseSheetMeta,
  UseSwitchMeta,
  UseTabsMeta,
  UseToolbarMeta,
  UseMessageBubbleMeta,
  UseSelectMeta,
  UseClickOutsideMeta,
  UseGradientMeta,
  UseFloatingPlacementMeta,
  UseSoundMeta,
  UseSpeechMeta,
  UseEventListenerMeta,
  UseKeyPressMeta,
  UseDisabledScrollMeta,
  UseIsMobileMeta,
  UseTimerMeta,
  UseSaveOnUnloadMeta,
  UsePerformanceMetricsMeta,
  UseTimeBeforeInteractionMeta,
  UseComponentsInteractionsMeta,
  UseABTestingMeta,
  UseBehaviorAnalyticsMeta,
  UseIndexedDBMeta,
  UseAppPropertiesMeta,
];

export function getHook(name: string): HookRegistryMetadata | undefined {
  return HookRegistry.find((meta) => meta.name === name);
}

export const ProviderRegistry: ProviderRegistryMetadata[] = [
  ColorModeProviderMeta,
  ColorModeMeta,
  UseColorModeMeta,
  ClientProviderMeta,
];

export function getProvider(
  name: string,
): ProviderRegistryMetadata | undefined {
  return ProviderRegistry.find((meta) => meta.name === name);
}

export const GuideRegistry: DocsGuideRegistryMetadata[] = [
  CoreInstallationMeta,
  CoreUsageMeta,
  HooksUsageMeta,
  HooksAPIReferenceMeta,
  IconsInstallationMeta,
  IconsMeta,
  TokensInstallationMeta,
  TokensMeta,
  StylesInstallationMeta,
  StylesUsageMeta,
  ComponentsInstallationMeta,
  ComponentsUsageMeta,
  AnalyticsInstallationMeta,
  AnalyticsUsageMeta,
];

export function getGuide(name: string): DocsGuideRegistryMetadata | undefined {
  return GuideRegistry.find((meta) => meta.name === name);
}
