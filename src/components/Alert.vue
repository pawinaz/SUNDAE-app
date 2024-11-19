<template>
    <div>
        <v-dialog v-model="flagAlert" persistent width="300">
            <v-alert :type="typeAlert" style="margin-bottom: 0px;">
                {{mesAlert}}
                <v-card-actions>
                <v-spacer></v-spacer>
                <div>
                    <v-btn color="white" outlined @click="CloseAlert()">Close</v-btn>
                </div>
                </v-card-actions>
            </v-alert>
        </v-dialog>
    </div>
</template>

<script>
export default {
    computed: {
    },
    props: {
        flagAlert: {
            type: Boolean,
            default: false,
        },
        typeAlert: {
            type: String,
            default: null,
        },
        mesAlert: {
            type: String,
            default: null,
        },
    },
    data:() => ( {
    }),
    mounted: function () {
    },
    watch: {
    },
    methods:{
        CloseAlert(){
            let self = this;
            self.$emit("flagClose");
        }
    },
}
</script>