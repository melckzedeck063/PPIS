import jQuery from "jquery";
import { useEffect } from "react";
export const BtnAnime = () => {

    const query_2 = () => {
        jQuery("button > *").on("click", function () {
            jQuery("button *").removeClass("btn_cli");
            jQuery(this).find(".bn1").hide();
            jQuery(this).find(".bn2").addClass("btn_cli");
            jQuery(this).prop("disabled", true);
            setTimeout(() => {
                jQuery(this).prop("disabled", false);
                jQuery(this).find(".bn1").show({
                    done: function () {
                        jQuery("button *").removeClass("btn_cli");
                        jQuery(this).prop("disabled", false);
                    }
                });
            }, 3000);
        });
    }
     useEffect(() => { query_2(); }, [])
}